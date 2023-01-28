import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

const Navbar = ({ title, actionBar }: { title?: string, actionBar?: JSX.Element }) => {
    const { data, status } = useSession()

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost normal-case text-xl">{title || "SolidCRUD"}</Link>
            </div>
            <div className="flex-none gap-2">
                {actionBar}
                {status === "authenticated" ?
                    <UserMenu imageUrl={data?.user?.image || ""} /> :
                    <button onClick={() => void signIn("discord")} className="btn btn-primary">Login</button>
                }
            </div>
        </div>
    )
}

const UserMenu = ({ imageUrl }: { imageUrl: string }) => (
    <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                <Image src={imageUrl} alt="avatar" width={40} height={40} />
            </div>
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li><a onClick={() => void signOut()}>Uitloggen</a></li>
        </ul>
    </div>
)

export default Navbar