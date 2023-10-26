import React, { Suspense } from 'react';
import { AuthRequired } from "@/components/(drizzlestarter)/auth-required";
import { TaskList } from "./_components/task-list";
import { TaskSignInFallback } from "./_components/task-signin-fallback";
import { useTranslations } from "next-intl";
import  { SkeletonFourBarsWSpinner } from '@/styles/components/loaders/MiniSpinner';

export default function page() {
  const t = useTranslations("tasks");
  return <>
    <div className="container mt-8 gap-4mx-auto flex flex-col gap-4">
      <AuthRequired fallback={<TaskSignInFallback />}>
        <Suspense fallback={<> <SkeletonFourBarsWSpinner /></>}>
          <TaskList />
        </Suspense>
      </AuthRequired>
    </div>
  </>;
}