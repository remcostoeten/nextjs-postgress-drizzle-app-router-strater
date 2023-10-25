'use client';
import { CalendarToday, Alarm, Person } from '@mui/icons-material'; 
import { useForm } from 'react-hook-form';

interface TodoItem {
    title: string;
    date: string;
    notifications: number;
    tag?: string;
}
export default function TaskForm() {
    const { register, handleSubmit, reset } = useForm<TodoItem>();

    const onSubmit = (data: TodoItem) => {
        console.log(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input {...register('title')} required className="w-full p-2 border rounded-md" placeholder="Enter todo title" />
            </div>
            <div>
                <label className="block text-sm font-medium">Date</label>
                <div className="flex items-center space-x-2">
                    <CalendarToday fontSize="small" />
                    <input {...register('date')} required type="date" className="p-2 border rounded-md" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium">Notifications</label>
                <div className="flex items-center space-x-2">
                    <Alarm fontSize="small" />
                    <input {...register('notifications')} required type="number" min="1" className="p-2 border rounded-md w-24" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium">Tag (optional)</label>
                <div className="flex items-center space-x-2">
                    <Person fontSize="small" />
                    <input {...register('tag')} className="p-2 border rounded-md" placeholder="Enter tag" />
                </div>
            </div>
            <div>
                <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md">Add Todo</button>
            </div>
        </form>
    );
};

