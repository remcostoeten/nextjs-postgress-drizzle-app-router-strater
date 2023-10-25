/* eslint-disable react/jsx-no-undef */
'use client'
import { FC } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@c/ui/dialog';
import { Button } from "@c/ui/button"
import { Input } from "@c/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@c/ui/popover"

type ButtonProps = {
    label: string;
    icon: React.ReactNode;
};

const NewTaskUi: FC = () => {

    return (
        <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">To-Do</h2>
            <div className="flex space-x-4">
                <Dialog>
                    <DialogTrigger>
                        <Button variant='outline'>
                            <AddIcon className="mr-2 h-4 w-4 " /> Add todo
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                            <DialogDescription>
                                <input type="text" placeholder="Enter your task..." className="w-full p-2 border rounded" />
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Popover>
                    <PopoverTrigger>
                        <Button variant="outline">
                            <FilterAltIcon className="mr-2 h-4 w-4 " /> Filter
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Dimensions</h4>
                                <p className="text-sm text-muted-foreground">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="width">Width</Label>
                                    <Input
                                        id="width"
                                        defaultValue="100%"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="maxWidth">Max. width</Label>
                                    <Input
                                        id="maxWidth"
                                        defaultValue="300px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="height">Height</Label>
                                    <Input
                                        id="height"
                                        defaultValue="25px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="maxHeight">Max. height</Label>
                                    <Input
                                        id="maxHeight"
                                        defaultValue="none"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default NewTaskUi;

