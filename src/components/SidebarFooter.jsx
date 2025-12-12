const SidebarFooter = () => {
    return (

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white font-semibold">
                    C
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        Candidate
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        candidate@example.com
                    </p>
                </div>
            </div>
        </div>

    );
};
export default SidebarFooter;