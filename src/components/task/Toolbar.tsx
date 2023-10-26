import Image from "next/image";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "../ui/input";
import { SearchSharp } from "@mui/icons-material";

interface ToolbarProps {
  onSortDate: () => void;
  onSortChecked: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function Toolbar({ onSortDate, onSortChecked, onChange, value }: ToolbarProps) {
  return <>
    <div className="justify-between items-start self-stretch w-full flex gap-5 rounded max-md:flex-wrap">
      <section className="items-start self-stretch flex gap-2.5 mt-2 pr-2.5 py-2 max-md:justify-center w-full">
        <div className="items-start rounded self-stretch flex justify-between gap-3 w-full">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account" onClick={onSortDate}>Sort date
                <Image className="rotate-180" width="12" height="12" src='/icons/sorter-alt.svg' alt='sorter' />
              </TabsTrigger>
              <TabsTrigger value="password" onClick={onSortChecked}>Sort checked
                <Image width="12" height="12" src='/icons/sorter-alt.svg' alt='sorter' />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative text-gray-600">
            <Input type="search" value={value} onChange={onChange} name="serch" placeholder="Search" className="bg-transparent h-10 px-5 pr-10 rounded-full text-sm focus:outline-none" />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <SearchSharp className="-translate-y-1 scale-75" />
            </button>
          </div>
        </div>
      </section>
    </div>
  </>;
}