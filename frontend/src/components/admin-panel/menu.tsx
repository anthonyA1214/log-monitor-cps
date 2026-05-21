import { Ellipsis } from "lucide-react"
import { cn } from "@/lib/utils"
import { getMenuList } from "@/lib/menu-list"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Link, useLocation } from "@tanstack/react-router"
import { motion } from "motion/react"

interface MenuProps {
  isOpen: boolean | undefined
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  const menuList = getMenuList(pathname)

  return (
    <ScrollArea className="[&>div>div[style]]:block!">
      <nav className="mt-8 h-full w-full">
        <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="max-w-62 truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="flex w-full items-center justify-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ id, href, label, icon: Icon, active, submenus }) => {
                  const isActive =
                    active === undefined
                      ? href === "/"
                        ? pathname === href
                        : pathname.startsWith(href)
                      : active

                  return !submenus || submenus.length === 0 ? (
                    <div className="relative w-full" key={id}>
                      {isActive && (
                        <motion.div
                          className="absolute top-0 left-0 h-full w-1 rounded-md bg-primary"
                          layoutId="active-menu-indicator"
                        />
                      )}

                      {isActive && (
                        <motion.div
                          className="absolute top-0 left-0 h-full w-full rounded-md bg-primary/10"
                          layoutId="active-menu-background"
                        />
                      )}

                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              asChild
                              className={cn(
                                "text-muted1 hover:text-text mb-1 h-10 w-full justify-start ps-4",
                                isActive &&
                                  "text-primary! hover:bg-transparent!"
                              )}
                              variant="ghost"
                            >
                              <Link
                                className="relative flex w-full items-center"
                                to={href}
                              >
                                <span
                                  className={cn(
                                    isOpen === false
                                      ? "absolute left-1/2 -translate-x-1/2"
                                      : "mr-4"
                                  )}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-50 truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={id}>
                      <CollapseMenuButton
                        active={isActive}
                        icon={Icon}
                        isOpen={isOpen}
                        label={label}
                        submenus={submenus}
                      />
                    </div>
                  )
                }
              )}
            </li>
          ))}
          {/* <li className="flex w-full grow items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    className="mt-5 h-10 w-full justify-center"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "hidden opacity-0" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li> */}
        </ul>
      </nav>
    </ScrollArea>
  )
}
