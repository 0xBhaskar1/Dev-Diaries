import { Link, useNavigate,NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger,SheetHeader,SheetTitle } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, PenTool, User } from "lucide-react";
import LogoutBtn from "./LogoutBtn";

import MobileLogoutBtn from "./MobileLogoutBtn";

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate();


    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "My Posts", slug: "/my-posts", active: authStatus },
        { name: "Write", slug: "/add-post", active: authStatus },
    ];

    const baseStyle = "relative text-sm font-medium transition-colors duration-300";

    const underlineStyle = "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-black after:transition-transform after:duration-300";

    const activeStyle = "text-black after:scale-x-100"; 

    const inactiveStyle = "text-zinc-600 hover:text-black after:scale-x-0 hover:after:scale-x-100";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

               
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
                        <PenTool className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900">DevDiaries.</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) =>
                        item.active ? (
                            <NavLink
                                key={item.slug}
                                to={item.slug}
                                className={({ isActive }) =>
                                {
                                    return `${baseStyle} ${underlineStyle} ${isActive ? activeStyle : inactiveStyle}`;
                                }
                                }
                            >   
                                {item.name}
                            </NavLink>
                        ) : null
                    )}
                </nav>

            
                <div className="flex items-center gap-4">

                    {authStatus && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-zinc-100">
                                            <User className="h-4 w-4 text-zinc-900" />
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{userData?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{userData?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate("/profile")}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <LogoutBtn />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-4 mt-8 p-4">
                                    {navItems.map((item) => item.active ? (
                                        <Link key={item.slug} to={item.slug} className="text-lg font-semibold">
                                            {item.name}
                                        </Link>
                                    ) : null)}

                                    
                                    {authStatus && (
                                        <MobileLogoutBtn/>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

            </div>
        </header>
    );
}