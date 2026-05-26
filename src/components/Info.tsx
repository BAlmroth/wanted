import { useEffect, useRef, useState } from "react";
import styles from "./Info.module.css";
import DownArrow from "../assets/DownArrow.png";
import InfoContent from "./InfoContent";
import Caution from "./Caution";
import type { InfoModalProps } from "../types/Info";

export default function Info({
  isOpen,
  onClose,
  onStartGame,
  showStartButton = true,
  showCautionOnly = false,
}: InfoModalProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasEverScrolledToBottom, setHasEverScrolledToBottom] = useState(false);

  const handleStart = () => {
    onStartGame?.();
    onClose();
  };

  const checkScrollPosition = () => {
    const element = scrollRef.current;
    if (!element) return;

    const isAtBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 8;
    const atBottom = isAtBottom || element.scrollHeight <= element.clientHeight;
    setHasScrolledToBottom(atBottom);
    if (atBottom) setHasEverScrolledToBottom(true);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      // Fokus trap - keep focus in the modal
      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const focusableArray = Array.from(focusableElements) as HTMLElement[];

        if (focusableArray.length === 0) return;

        const firstElement = focusableArray[0];
        const lastElement = focusableArray[focusableArray.length - 1];
        const activeElement = document.activeElement;

        if (event.shiftKey) {
          // Shift + Tab (back)
          if (activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab (forward)
          if (activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const element = scrollRef.current;
    if (!element) return;

    checkScrollPosition();

    const resizeObserver = new ResizeObserver(() => {
      checkScrollPosition();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setHasScrolledToBottom(false);
      setHasEverScrolledToBottom(false);
    } else {
      // Focus on teh first focusable element
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0] as HTMLElement;
        if (firstElement) {
          setTimeout(() => firstElement.focus(), 0);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} role="presentation" />
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.header}>
          <h3 id="modal-title">Game Info</h3>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Back"
          >
            Back
          </button>
        </div>

        <div className={styles.scrollArea}>
          <div
            ref={scrollRef}
            className={styles.scrollContent}
            onScroll={checkScrollPosition}
          >
            <Caution />
            {!showCautionOnly && <InfoContent />}
          </div>

          {!hasScrolledToBottom && (
            <>
              <div className={styles.scrollFade} aria-hidden="true" />
              <div className={styles.scrollBubble} aria-hidden="true">
                <img src={DownArrow} alt="" aria-hidden="true" />
              </div>
            </>
          )}
        </div>

        <div className={styles.footer}>
          {showStartButton || showCautionOnly ? (
            <button
              className={styles.closeButtonBottom}
              onClick={handleStart}
              disabled={!hasEverScrolledToBottom}
              aria-disabled={!hasEverScrolledToBottom}
            >
              {showCautionOnly ? "Start game" : "Ready? - Start game 2€"}
            </button>
          ) : (
            <button className={styles.closeButtonBottom} onClick={onClose}>
              Got it
            </button>
          )}
        </div>
      </div>
    </>
  );
}
