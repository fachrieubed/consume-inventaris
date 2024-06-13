export default function Title({ name, page,lang }) {
    return (
        <>
        <h1 className="text-white">Nama: {name}</h1>
        <p className="text-white">Page: {page}</p>
        <p className="text-white">language: {lang}</p>
        </>
    )
}