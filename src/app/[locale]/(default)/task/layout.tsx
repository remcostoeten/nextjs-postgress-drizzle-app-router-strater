import TaskHeader from "@/components/task/TaskHeader"
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

type layoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: layoutProps) {
    return (
        <>
            <main className={`flex flex-col ${inter.className}`}>
                <TaskHeader />
                {children}
            </main>
        </>
    )
}