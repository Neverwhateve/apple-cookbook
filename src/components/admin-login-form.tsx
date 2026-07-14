"use client";

import { ShieldAlert } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdmin } from "@/app/admin/feedback/actions";

const initialAdminLoginState = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 inline-flex min-h-10 w-full items-center justify-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
    >
      {pending ? "正在登录" : "登录"}
    </button>
  );
}

export function AdminLoginForm() {
  const [state, formAction] = useActionState(loginAdmin, initialAdminLoginState);

  return (
    <main className="mx-auto max-w-md px-4 py-10 sm:px-6">
      <form action={formAction} className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-1 h-5 w-5 flex-none text-zinc-600 dark:text-zinc-300" />
          <div>
            <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">管理员登录</h1>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">登录后复核 AI 判断、管理 P0，并修改文章。</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-username" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">用户名</label>
            <input id="admin-username" name="username" autoComplete="username" required className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900" />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-sm font-medium text-zinc-950 dark:text-zinc-50">密码</label>
            <input id="admin-password" name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900" />
          </div>
        </div>

        <p className="mt-4 min-h-5 text-sm text-red-600 dark:text-red-400" aria-live="polite">{state.error}</p>
        <SubmitButton />
      </form>
    </main>
  );
}
