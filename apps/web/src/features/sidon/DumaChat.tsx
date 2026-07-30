"use client";

import { ArrowUp, ChevronDown, Paperclip } from "lucide-react";
import Image from "next/image";
import { FormEvent, KeyboardEvent, useRef, useState } from "react";

import styles from "./duma.module.css";

export type DumaChatCopy = Readonly<{
  attach: string;
  attachedFile: string;
  greeting: string;
  label: string;
  placeholder: string;
  reply: string;
  send: string;
  suggestions: string[];
  title: string;
}>;

type DumaChatModule = Readonly<{ icon: string; id: string; name: string }>;
type DumaChatModuleGroup = Readonly<{ id: string; modules: readonly DumaChatModule[]; name: string }>;

export function getDumaReply(reply: string) {
  return reply;
}

export function getDumaSelectorDistance(index: number, activeIndex: number) {
  return Math.min(3, Math.abs(index - activeIndex));
}

export function DumaChat({ categoryNavigatorLabel, content, moduleGroups }: Readonly<{ categoryNavigatorLabel: string; content: DumaChatCopy; moduleGroups: readonly DumaChatModuleGroup[] }>) {
  const [messages, setMessages] = useState<ReadonlyArray<Readonly<{ author: "duma" | "user"; text: string }>>>([]);
  const [query, setQuery] = useState("");
  const [fileName, setFileName] = useState("");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);

  function send(text = query) {
    const message = text.trim();
    if (!message) return;
    setMessages((current) => [...current, { author: "user", text: message }, { author: "duma", text: getDumaReply(content.reply) }]);
    setQuery("");
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

  const isEmpty = messages.length === 0;

  return <section aria-labelledby="duma-chat-title" className={styles.chatSection}>
    <div className={styles.chatLayout}>
      <nav aria-label={categoryNavigatorLabel} className={styles.chatModuleNavigator}>
        <ol>{moduleGroups.map((group, index) => <li key={group.id}><h3><button aria-controls={`duma-module-group-${group.id}`} aria-expanded={index === activeCategoryIndex} className={styles.chatCategoryToggle} data-distance={getDumaSelectorDistance(index, activeCategoryIndex)} onClick={() => setActiveCategoryIndex(index)} type="button">{group.name}<ChevronDown aria-hidden="true" size={16} /></button></h3><ol hidden={index !== activeCategoryIndex} id={`duma-module-group-${group.id}`}>{group.modules.map((module) => <li key={module.id}><span className={styles.chatModule}><Image alt="" height={32} src={module.icon} unoptimized width={32} /><span>{module.name}</span></span></li>)}</ol></li>)}</ol>
      </nav>
      <div className={styles.chatShell}>
      <header className={styles.chatTopbar}><span aria-hidden="true" className={styles.chatStatus} /><b>Duma AI</b></header>
      <div className={styles.chatContent}>
        {isEmpty && <div className={styles.chatWelcome}>
          <Image alt="" height={76} priority src="/pet/dumaHead.svg" style={{ filter: "none" }} unoptimized width={76} />
          <h2 id="duma-chat-title">{content.title}</h2>
          <p>{content.greeting}</p>
        </div>}
        <div aria-live="polite" className={styles.chatMessages} data-empty={isEmpty}>
          {messages.map((message, index) => <div className={message.author === "duma" ? styles.dumaMessage : styles.userMessage} key={`${message.author}-${index}`}>
            {message.author === "duma" && <Image alt="" height={32} src="/pet/dumaHead.svg" unoptimized width={32} />}
            <p>{message.text}</p>
          </div>)}
        </div>
      </div>
      {isEmpty && <div aria-label={content.label} className={styles.chatSuggestions}>
        {content.suggestions.map((suggestion) => <button key={suggestion} onClick={() => send(suggestion)} type="button">{suggestion}</button>)}
      </div>}
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
  </section>;
}
