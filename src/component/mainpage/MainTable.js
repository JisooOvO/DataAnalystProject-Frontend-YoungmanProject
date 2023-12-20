
const MainTable = () => {

    const rows = [
        { date: "2023-12-20", object: "사과", price: "20000원", place: "해피과수원" },
        { date: "2023-12-20", object: "짜장면", price: "7000원", place: "콩자반점" }
    ];

    return (
        <div className="bg-[#EDA170] border-8 border-[#EDA170] rounded-xl w-full h-full">
            <div className="text-white text-lg text-center font-bold mb-4">
                오늘의 가계부 기록
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white table-auto">
                    <thead>
                        <tr className="">
                            <th className="px-4 py-2 border">날짜</th>
                            <th className="px-4 py-2 border">물품명</th>
                            <th className="px-4 py-2 border">금액</th>
                            <th className="px-4 py-2 border">구매처</th>
                        </tr>
                    </thead>
                    <tbody className="h-[30rem]">
                        {rows.map((row, index) => (
                            <tr key={index} className="">
                                <td className="px-4 py-2 border-r">{row.date}</td>
                                <td className="px-4 py-2 border-r">{row.object}</td>
                                <td className="px-4 py-2 border-r">{row.price}</td>
                                <td className="px-4 py-2">{row.place}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default MainTable
