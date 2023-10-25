import TaskHeader from "@/components/task/TaskHeader";
import React from "react";
import IndividualTask from "@/components/task/IndividualTask";
import TaskForm from "@/components/task/TaskForm";

export default function page() {
  return <>
    <div className="container mx-auto p-10 flex flex-col gap-4">
      <TaskHeader />
      <IndividualTask />
      <TaskForm />
    </div>

  </>;
}
