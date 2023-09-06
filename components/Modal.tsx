"use client";

import {
  useCallback,
  useRef,
  ReactNode,
  useEffect,
  MouseEventHandler,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <div ref={wrapper} className="modal_wrapper">
        <div className="flex justify-between items-center pt-1 pb-4 px-1 mb-4 border-b border-nav-border w-full">
          <div className="text-2xl text-gray-100">Add Item</div>
          <button
            type="button"
            onClick={onDismiss}
            className="flex items-center border-2 border-gray-100 border-opacity-[25%] text-gray-100 text-opacity-[35%] rounded-lg p-2"
          >
            esc
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
