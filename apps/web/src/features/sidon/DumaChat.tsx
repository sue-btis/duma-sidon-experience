"use client";

import { ArrowUp, Paperclip } from "lucide-react";
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

export function getDumaReply(reply: string) {
  return reply;
}

export function DumaChat({ content }: Readonly<{ content: DumaChatCopy }>) {
  const [messages, setMessages] = useState<ReadonlyArray<Readonly<{ author: "duma" | "user"; text: string }>>>([]);
  const [query, setQuery] = useState("");
  const [fileName, setFileName] = useState("");
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
    <div className={styles.chatShell}>
      <header className={styles.chatTopbar}><span aria-hidden="true" className={styles.chatStatus} /><b>Duma AI</b></header>
      <div className={styles.chatContent}>
        {isEmpty && <div className={styles.chatWelcome}>
          <Image alt="" height={76} priority src="/home/worlds/dumaAi.png" unoptimized width={76} />
          <h2 id="duma-chat-title">{content.title}</h2>
          <p>{content.greeting}</p>
        </div>}
        <div aria-live="polite" className={styles.chatMessages} data-empty={isEmpty}>
          {messages.map((message, index) => <div className={message.author === "duma" ? styles.dumaMessage : styles.userMessage} key={`${message.author}-${index}`}>
            {message.author === "duma" && <Image alt="" height={32} src="/home/worlds/dumaAi.png" unoptimized width={32} />}
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
  </section>;
}
