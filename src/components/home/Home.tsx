import VersionHighlights from "./VersionHighlights"

function Home() {

    document.title = `Zenless Zone Zero ${import.meta.env.VITE_DOCUMENT_TITLE}`

    return (
        <>
            <VersionHighlights />
        </>
    )

}

export default Home