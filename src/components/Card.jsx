export default function Card({ judul, content }) {
    return (
        <>
        <h1 className="text-white">Judul: {judul}</h1>
        <p className="text-white">Content: {content}</p>
        </>
    )
}