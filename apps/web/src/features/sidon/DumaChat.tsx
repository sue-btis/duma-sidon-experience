"use client";

import { ArrowUp, ChevronDown, Paperclip } from "lucide-react";
import Image from "next/image";
import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import styles from "./duma.module.css";

export type DumaChatCopy = Readonly<{
  attach: string;
  attachedFile: string;
  categoryDumaReply: string;
  categoryExamples?: Readonly<Record<string, DumaChatExample>>;
  categoryQuestion: string;
  categorySuggestionAnswers: readonly string[];
  categorySuggestions: readonly string[];
  greeting: string;
  historyLabel: string;
  label: string;
  moduleExampleAnswer: string;
  moduleExampleQuestion: string;
  moduleExamples?: Readonly<Record<string, DumaChatExample>>;
  moduleQuestion: string;
  moduleSuggestionAnswers: readonly string[];
  moduleSuggestions: readonly string[];
  placeholder: string;
  reply: string;
  send: string;
  thinking: string;
  title: string;
}>;

type DumaChatVisual = Readonly<{ description: string; label: string; metric: string; type: "bar" | "line" | "ring" }>;
type DumaChatExample = Readonly<{ answer: string; question: string; visual?: DumaChatVisual }>;

export type DumaChatModule = Readonly<{ description: string; icon: string; id: string; name: string }>;
export type DumaChatModuleGroup = Readonly<{ id: string; intro: string; modules: readonly DumaChatModule[]; name: string; solves: string }>;

type Message = Readonly<{ author: "duma" | "user"; text: string; visual?: DumaChatVisual }>;
type Target = Readonly<{ categoryIndex: number; kind: "category" } | { categoryIndex: number; kind: "module"; moduleId: string }>;
type Suggestion = Readonly<{ answer: string; question: string }>;
type Conversation = Readonly<{ id: string; messages: readonly Message[]; suggestions: readonly Suggestion[]; title: string }>;

function interpolate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export function getDumaReply(reply: string) {
  return reply;
}

export function getDumaSelectorDistance(index: number, activeIndex: number) {
  return Math.min(3, Math.abs(index - activeIndex));
}

export function getTypedText(text: string, visibleCharacters: number) {
  return text.slice(0, visibleCharacters);
}

export function getDumaConversation(target: Target, content: DumaChatCopy, moduleGroups: readonly DumaChatModuleGroup[]): Conversation {
  const category = moduleGroups[target.categoryIndex];
  const modules = category.modules.map((module) => module.name).join(", ");

  if (target.kind === "category") {
    const values = { modules, name: category.name, solves: category.solves };
    const example = content.categoryExamples?.[category.id];
    return {
      id: `category-${category.id}`,
      messages: [
        { author: "user", text: interpolate(content.categoryQuestion, values) },
        { author: "duma", text: interpolate(content.categoryDumaReply, { ...values, intro: category.intro }) },
        ...(example ? [{ author: "user" as const, text: example.question }, example.visual ? { author: "duma" as const, text: example.answer, visual: example.visual } : { author: "duma" as const, text: example.answer }] : []),
      ],
      suggestions: content.categorySuggestions.map((question, index) => ({ answer: interpolate(content.categorySuggestionAnswers[index] ?? "", values), question })),
      title: category.name,
    };
  }

  const selectedModule = category.modules.find((item) => item.id === target.moduleId);
  if (!selectedModule) throw new Error(`Unknown Duma module: ${target.moduleId}`);
  const values = { category: category.name, description: selectedModule.description, name: selectedModule.name };
  const example = content.moduleExamples?.[selectedModule.id];
  return {
    id: `module-${selectedModule.id}`,
    messages: [
      { author: "user", text: interpolate(content.moduleQuestion, values) },
      { author: "duma", text: selectedModule.description },
      { author: "user", text: example?.question ?? interpolate(content.moduleExampleQuestion, values) },
      example?.visual
        ? { author: "duma", text: example.answer, visual: example.visual }
        : { author: "duma", text: example?.answer ?? interpolate(content.moduleExampleAnswer, values) },
    ],
    suggestions: content.moduleSuggestions.map((question, index) => ({ answer: interpolate(content.moduleSuggestionAnswers[index] ?? "", values), question: interpolate(question, values) })),
    title: selectedModule.name,
  };
}

function DumaDataVisual({ visual }: Readonly<{ visual: DumaChatVisual }>) {
  return <figure aria-label={visual.label} className={styles.chatDataVisual} data-type={visual.type}>
    <figcaption><span>{visual.label}</span><b>{visual.metric}</b></figcaption>
    <div aria-hidden="true" className={styles.chatDataPlot}>
      {visual.type === "line" ? <svg viewBox="0 0 160 44"><path d="M0 36 L24 30 L48 34 L72 16 L96 21 L120 8 L160 13" /></svg> : null}
      {visual.type === "bar" ? <>{[42, 71, 58, 86].map((height) => <i key={height} style={{ height: `${height}%` }} />)}</> : null}
      {visual.type === "ring" ? <i className={styles.chatDataRing} /> : null}
    </div>
    <p>{visual.description}</p>
  </figure>;
}

function ChatMessages({ animate, content, conversation, onSuggestion }: Readonly<{ animate: boolean; content: DumaChatCopy; conversation: Conversation; onSuggestion: (suggestion: Suggestion) => void }>) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(null);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [visibleMessageCount, setVisibleMessageCount] = useState(() => animate ? 0 : conversation.messages.length);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) window.setTimeout(updatePreference, 0);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || !animate) {
      if (visibleMessageCount >= conversation.messages.length && typingMessageIndex === null) return;
      const timer = window.setTimeout(() => {
        setTypingMessageIndex(null);
        setVisibleMessageCount(conversation.messages.length);
      }, 0);
      return () => window.clearTimeout(timer);
    }
    const nextMessage = conversation.messages[visibleMessageCount];
    if (!nextMessage || typingMessageIndex !== null) return;
    const timer = window.setTimeout(() => {
      if (nextMessage.author === "user") {
        setVisibleMessageCount((count) => count + 1);
        return;
      }
      setTypedCharacters(0);
      setTypingMessageIndex(visibleMessageCount);
    }, nextMessage.author === "user" ? 260 : 380);
    return () => window.clearTimeout(timer);
  }, [animate, conversation.messages, reducedMotion, typingMessageIndex, visibleMessageCount]);

  useEffect(() => {
    if (reducedMotion || !animate || typingMessageIndex === null) return;
    const message = conversation.messages[typingMessageIndex];
    if (!message) return;
    if (typedCharacters >= message.text.length) {
      const timer = window.setTimeout(() => {
        setTypingMessageIndex(null);
        setVisibleMessageCount(typingMessageIndex + 1);
      }, 120);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setTypedCharacters((count) => count + 1), 14);
    return () => window.clearTimeout(timer);
  }, [animate, conversation.messages, reducedMotion, typedCharacters, typingMessageIndex]);

  return <><div className={styles.chatContent}><div aria-live={typingMessageIndex === null ? "polite" : "off"} className={styles.chatMessages}>{conversation.messages.slice(0, visibleMessageCount).map((message, index) => <div className={message.author === "duma" ? styles.dumaMessage : styles.userMessage} key={`${message.author}-${index}`}>
    {message.author === "duma" && <Image alt="" height={32} src="/pet/dumaHead.svg" unoptimized width={32} />}
    <div><p>{message.text}</p>{message.visual ? <DumaDataVisual visual={message.visual} /> : null}</div>
  </div>)}{typingMessageIndex !== null && <div className={styles.dumaMessage}><Image alt="" height={32} src="/pet/dumaHead.svg" unoptimized width={32} /><p>{typedCharacters === 0 ? <span className={styles.chatThinking}>{content.thinking}<i aria-hidden="true" /></span> : getTypedText(conversation.messages[typingMessageIndex].text, typedCharacters)}</p></div>}</div></div>
  {visibleMessageCount === conversation.messages.length && typingMessageIndex === null && <div aria-label={content.label} className={styles.chatSuggestions}>{conversation.suggestions.map((suggestion) => <button key={suggestion.question} onClick={() => onSuggestion(suggestion)} type="button">{suggestion.question}</button>)}</div>}</>;
}

export function DumaChat({ categoryNavigatorLabel, content, moduleGroups }: Readonly<{ categoryNavigatorLabel: string; content: DumaChatCopy; moduleGroups: readonly DumaChatModuleGroup[] }>) {
  const initialTarget: Target = { categoryIndex: 0, kind: "category" };
  const [activeTarget, setActiveTarget] = useState<Target>(initialTarget);
  const [activeConversationId, setActiveConversationId] = useState(() => getDumaConversation(initialTarget, content, moduleGroups).id);
  const [conversations, setConversations] = useState<readonly Conversation[]>(() => [getDumaConversation(initialTarget, content, moduleGroups)]);
  const [shouldAnimateConversation, setShouldAnimateConversation] = useState(true);
  const [query, setQuery] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const openTarget = useCallback((target: Target) => {
    const nextConversation = getDumaConversation(target, content, moduleGroups);
    setActiveTarget(target);
    setActiveConversationId(nextConversation.id);
    setShouldAnimateConversation(true);
    setConversations((current) => current.some((conversation) => conversation.id === nextConversation.id) ? current : [nextConversation, ...current]);
  }, [content, moduleGroups]);

  useEffect(() => {
    if (activeTarget.kind === "module") return;
    const timer = window.setTimeout(() => openTarget({ categoryIndex: (activeTarget.categoryIndex + 1) % moduleGroups.length, kind: "category" }), 12_000);
    return () => window.clearTimeout(timer);
  }, [activeTarget, moduleGroups.length, openTarget]);

  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0];

  function appendMessage(message: Message) {
    setConversations((current) => current.map((conversation) => conversation.id === activeConversation.id ? { ...conversation, messages: [...conversation.messages, message] } : conversation));
  }

  function send(text = query) {
    const message = text.trim();
    if (!message) return;
    appendMessage({ author: "user", text: message });
    appendMessage({ author: "duma", text: getDumaReply(content.reply) });
    setQuery("");
  }

  function sendSuggestion(suggestion: Suggestion) {
    appendMessage({ author: "user", text: suggestion.question });
    appendMessage({ author: "duma", text: suggestion.answer });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  }

  return <section aria-labelledby="duma-chat-title" className={styles.chatSection}>
    <div className={styles.chatLayout}>
      <nav aria-label={categoryNavigatorLabel} className={styles.chatModuleNavigator}>
        <ol>{moduleGroups.map((group, index) => <li key={group.id}><h3><button aria-controls={`duma-module-group-${group.id}`} aria-expanded={index === activeTarget.categoryIndex} className={styles.chatCategoryToggle} data-distance={getDumaSelectorDistance(index, activeTarget.categoryIndex)} onClick={() => openTarget({ categoryIndex: index, kind: "category" })} type="button">{group.name}<ChevronDown aria-hidden="true" size={16} /></button></h3><ol hidden={index !== activeTarget.categoryIndex} id={`duma-module-group-${group.id}`}>{group.modules.map((module) => <li key={module.id}><button className={styles.chatModule} onClick={() => openTarget({ categoryIndex: index, kind: "module", moduleId: module.id })} type="button"><Image alt="" height={32} src={module.icon} unoptimized width={32} /><span>{module.name}</span></button></li>)}</ol></li>)}</ol>
      </nav>
      <div className={styles.chatShell}>
        <div className={styles.chatWorkspace}>
          <aside aria-label={content.historyLabel} className={styles.chatHistory}>
            <header className={styles.chatHistoryBrand}><span aria-hidden="true" className={styles.chatStatus} /><b>Duma AI</b></header>
            <p>{content.historyLabel}</p>
            <ol>{conversations.map((conversation) => <li key={conversation.id}><button aria-current={conversation.id === activeConversation.id ? "page" : undefined} onClick={() => { setActiveConversationId(conversation.id); setShouldAnimateConversation(false); }} type="button">{conversation.title}</button></li>)}</ol>
          </aside>
          <div className={styles.chatConversation}>
            <ChatMessages animate={shouldAnimateConversation} content={content} conversation={activeConversation} key={activeConversation.id} onSuggestion={sendSuggestion} />
            <form className={styles.chatComposer} onSubmit={handleSubmit}>
              {fileName && <span className={styles.chatFile}>{content.attachedFile}: {fileName}</span>}
              <textarea aria-label={content.placeholder} onChange={(event) => setQuery(event.target.value)} onKeyDown={handleKeyDown} placeholder={content.placeholder} rows={1} value={query} />
              <div className={styles.chatActions}>
                <input className={styles.chatFileInput} id="duma-file" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} ref={fileInput} type="file" />
                <button aria-label={content.attach} className={styles.chatAttach} onClick={() => fileInput.current?.click()} type="button"><Paperclip aria-hidden="true" size={18} /></button>
                <button aria-label={content.send} className={styles.chatSend} disabled={!query.trim()} type="submit"><ArrowUp aria-hidden="true" size={18} /></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
