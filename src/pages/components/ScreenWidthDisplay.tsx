
export default function ScreenWidthDisplay() {

    return (
        <div className="absolute left-0 top-0 text-sm">
            <div className="px-2 py-1 bg-white text-black sm:hidden"><strong>Extra Small</strong> (width &lt; 640px)</div>
            <div className="px-2 py-1 bg-green-300 text-black hidden sm:max-md:block"><strong>Small</strong> (640px &lt;= width &lt; 768px)</div>
            <div className="px-2 py-1 bg-blue-300 text-black hidden md:max-lg:block"><strong>Medium</strong> (768px &lt;= width &lt; 1024px)</div>
            <div className="px-2 py-1 bg-purple-300 text-black hidden lg:max-xl:block"><strong>Large</strong> (1024px &lt;= width &lt; 1280px)</div>
            <div className="px-2 py-1 bg-orange-300 text-black hidden xl:block"><strong>Extra Large</strong> (width &gt;= 1280px)</div>
        </div>
    );
}
