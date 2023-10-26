'use client'
import { FC } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@c/ui/popover"
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Input } from '../ui/input';
import { TaskInput } from '@/app/[locale]/(default)/task/_components/task-input';

const TaskHeader: FC = () => {
    return (
        <div className="flex flex-col  gap-4">
            <h2 className="text-xl font-bold">To-Do</h2>
            <Separator />
            <div className="flex gap-4 mb-12">
                <Popover>
                    <PopoverTrigger>
                        <span className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2'>
                            <AddIcon className="mr-2 h-4 w-4 " /> Add todo
                        </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-8">
                        <TaskInput/>
                    </PopoverContent>
                </Popover>
                <Sheet>
                    <SheetTrigger>

                        <span className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2'>
                            <FilterAltIcon className="mr-2 h-4 w-4 " /> Filter
                        </span>

                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                            <SheetDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default TaskHeader;

