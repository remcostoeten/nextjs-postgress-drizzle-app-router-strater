'use client'
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { createTaskAction } from "@/app/_action"

const taskFormSchema = z.object({
    title: z.string(),
    weight: z.number().int().optional(),
    category: z.string().optional(),
})

type TaskFormValues = z.infer<typeof taskFormSchema> & {
    weight?: number
    category?: string
}

const defaultValues: Partial<TaskFormValues> = {
    title: "",
    category: "",
    weight: 1
}

export function TaskForm() {
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues
    })

    async function onSubmit(data: TaskFormValues) {
        const title = data?.title
        if (!title || typeof title !== 'string') return

        await createTaskAction(title)

        toast.success("Your task has been created.")
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full max-w-lg">
                            <FormLabel>Create a New Task</FormLabel>
                            <FormControl>
                                <Input placeholder="task" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
