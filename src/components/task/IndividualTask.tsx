
{/* <div className="container mx-auto p-10">
<TodoList />
</div> */}
import { CalendarToday, Alarm, Person } from '@mui/icons-material';

interface TodoItem {
    title: string;
    date: string;
    weight: number;
    tag?: string;
}
import React from "react";

export default function IndividualTask() {

    const todos: TodoItem[] = [
        {
            title: 'Finish user onboarding',
            date: 'Tomorrow',
            weight: 1
        },
        {
            title: 'Solve the Dabble prioritisation issue',
            date: 'Jan 8, 2022',
            weight: 2,
            tag: 'LaunchPad'
        }
    ];

    return (
        <div>
            {todos.map((todo, index) => (
                <div key={index} className="border p-4 flex justify-between items-center space-x-2">
                    <div>
                        <h2 className="text-lg">{todo.title}</h2>
                        <div className="flex items-center space-x-2">
                            <CalendarToday fontSize="small" />
                            <span>{todo.date}</span>
                            <Alarm fontSize="small" />
                            <span>{todo.weight}</span>
                            {todo.tag && (
                                <>
                                    <Person fontSize="small" />
                                    <span className="bg-purple-500 text-white px-2 py-1 rounded-md">
                                        {todo.tag}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
