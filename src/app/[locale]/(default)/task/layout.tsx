import TaskHeader from "@/components/task/TaskHeader"

type layoutProps = {
    children: React.ReactNode
}




export default function Layout({ children }: layoutProps) {
    return (
        <>
            <main className=" flex flex-col ">
                <TaskHeader />
                {children}
            </main>
        </>
    )
}