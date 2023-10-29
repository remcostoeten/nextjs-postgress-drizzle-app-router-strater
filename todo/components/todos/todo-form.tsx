'use client'

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
import { toast } from 'sonner';
import { createTodoAction } from "@/app/_action"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const todoFormSchema = z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    weight: z.string().optional(),
    category: z.string().optional(),
    date: z.date().optional(),
});

type TodoFormValues = z.infer<typeof todoFormSchema>

const defaultValues: Partial<TodoFormValues> = {
    title: "",
    category: "",
    date: undefined
}

export function TodoForm() {
    const form = useForm<TodoFormValues>({
        resolver: zodResolver(todoFormSchema),
        defaultValues
    })

    async function onSubmit(data: TodoFormValues) {
        const title = data?.title
        const weight = data?.weight
        const category = data?.category
        const date = data?.date
        if (!title || typeof title !== 'string') return

        await createTodoAction(title, weight, category, date)

        toast.success('Todo created successfully')

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
                            <FormLabel>Create a New Todo</FormLabel>
                            <FormControl>
                                <Input placeholder="todo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem className="w-full max-w-lg">
                            <FormLabel>Weight</FormLabel>
                            <FormControl>
                                <Input placeholder="weight" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem className="w-full max-w-lg">
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="category" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="w-full max-w-lg">
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                {/* @ts-ignore */}
                                <Popover>
                                    {/* @ts-ignore */}
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    {/* @ts-ignore */}
                                    <PopoverContent className="w-auto p-0">
                                        <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                                <FormItem className="w-full max-w-lg">
                                                    <FormLabel>Date</FormLabel>
                                                    <FormControl>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[280px] justify-start text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value}
                                                                    onSelect={(value: Date | undefined) => {
                                                                        if (value) {
                                                                            field.onChange(value);
                                                                        }
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </PopoverContent>
                                </Popover>
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