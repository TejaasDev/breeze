import Link from "next/link"
import { Wind } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-muted/30 pt-16 pb-8">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-primary/10 p-2 text-primary">
                                <Wind className="h-4 w-4" />
                            </div>
                            <span className="font-heading text-lg font-bold tracking-tight">
                                Breeze
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Structured confidence training disguised as a game. Grow quietly, rise loudly.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Methodology</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">About</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Breeze Inc. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* Social icons would go here */}
                    </div>
                </div>
            </div>
        </footer>
    )
}
