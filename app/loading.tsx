const GlobalLoading = () => {
    return (
        <div className="fixed inset-x-0 top-0 z-50 h-1">
            <style>{`
                @keyframes global-loading-slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(400%); }
                }
            `}</style>
            <div className="h-full w-full overflow-hidden bg-muted/50">
                <div
                    className="h-full w-1/4 rounded-full bg-primary"
                    style={{ animation: "global-loading-slide 1.2s ease-in-out infinite" }}
                />
            </div>
        </div>
    )
}

export default GlobalLoading