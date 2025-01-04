import { createPortal } from "react-dom";
import { DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";

export const PortalDialog = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(<DialogContent className='p-8'>{children}</DialogContent>, document.body);
};