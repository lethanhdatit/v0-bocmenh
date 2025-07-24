"use client";

import { Stars } from "lucide-react";
import { PreDataModel, PreDataTru } from "./types";

const COLS = [
	{ key: "year", label: "Trụ Năm" },
	{ key: "month", label: "Trụ Tháng" },
	{ key: "day", label: "Trụ Ngày" },
	{ key: "hour", label: "Trụ Giờ" },
];

function getTru(preData: PreDataModel, col: string): PreDataTru | undefined {
	return preData?.tuTru?.[col as keyof typeof preData.tuTru];
}

function TruCell({
	tru,
	field,
	className = "",
}: {
	tru?: PreDataTru;
	field: "can" | "chi" | "napAm";
	className?: string;
}) {
	if (!tru) return <td className={className}>--</td>;
	if (field === "can") return <td className={className}>{tru.can.display}</td>;
	if (field === "chi") return <td className={className}>{tru.chi.display}</td>;
	if (field === "napAm")
		return <td className={className}>{tru.napAm.display}</td>;
	return <td className={className}>--</td>;
}

function TruAmDuong({
	tru,
	field,
}: {
	tru?: PreDataTru;
	field: "can" | "chi";
}) {
	if (!tru) return <td>--</td>;
	return (
		<td className="text-xs text-gray-500">{tru[field].amDuong.display}</td>
	);
}

function TruNguHanh({
	tru,
	field,
}: {
	tru?: PreDataTru;
	field: "can" | "chi";
}) {
	if (!tru) return <td>--</td>;
	return (
		<td className="text-xs text-gray-500">
			{tru[field].nguHanhBanMenh.display}
		</td>
	);
}

function TruThapThan({ tru }: { tru?: PreDataTru }) {
	if (!tru?.thapThan?.length) return <td>--</td>;
	return <td className="text-xs text-gray-500">{tru.thapThan.join(", ")}</td>;
}

function TruVongTruongSinh({ tru }: { tru?: PreDataTru }) {
	if (!tru?.vongTruongSinh?.length) return <td>--</td>;
	return (
		<td className="text-xs text-gray-500">{tru.vongTruongSinh.join(", ")}</td>
	);
}

function TruThanSat({ tru }: { tru?: PreDataTru }) {
	if (!tru?.thanSat?.length) return <td>--</td>;
	return <td className="text-xs text-gray-500">{tru.thanSat.join(", ")}</td>;
}

export function LaSoBatTuSection({
	preData,
	t,
}: {
	preData: PreDataModel;
	t: any;
}) {
	return (
		<section className="p-2 xs:p-4 md:p-6 bg-gray-900/80 rounded-xl border border-yellow-500/30 shadow-lg">
			<h2 className="text-lg xs:text-xl md:text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
				<Stars className="w-5 h-5 xs:w-6 xs:h-6" />
				{t("destiny.result.battuChart", "Lá số Bát tự Tứ trụ")}
			</h2>
			<div className="overflow-x-auto">
				<table className="mx-auto border border-yellow-400 rounded-lg bg-yellow-50 text-center min-w-[600px] sm:min-w-[900px] text-xs xs:text-sm">
					<thead>
						<tr className="bg-orange-600 text-white">
							<th className="px-3 py-2 border-r border-white text-base font-bold w-40">
								Lá số Bát tự
							</th>
							{COLS.map((col) => (
								<th key={col.key} className="px-3 py-2 text-base font-bold">
									{col.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="text-gray-900">
						{/* Dương lịch */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Dương lịch
							</td>
							<td>{preData?.solarDate?.date?.slice(0, 10) ?? "--"}</td>
							<td>{preData?.solarDate?.date?.slice(0, 10) ?? "--"}</td>
							<td>{preData?.solarDate?.date?.slice(0, 10) ?? "--"}</td>
							<td>{preData?.solarDate?.date?.slice(0, 10) ?? "--"}</td>
						</tr>
						{/* Âm lịch */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Âm lịch
							</td>
							<td>{preData?.lunarDate?.date?.slice(0, 10) ?? "--"}</td>
							<td>{preData?.lunarDate?.date?.slice(0, 10) ?? "--"}</td>
							<td>{preData?.lunarDate?.date?.slice(0, 10) ?? "--"}</td>
							<td>{preData?.lunarDate?.date?.slice(0, 10) ?? "--"}</td>
						</tr>
						{/* Tiết khí */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Tiết khí
							</td>
							<td colSpan={4}>{preData?.solarTerm ?? "--"}</td>
						</tr>
						{/* Thiên can */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Thiên can
							</td>
							{COLS.map((col) => (
								<TruCell
									key={col.key}
									tru={getTru(preData, col.key)}
									field="can"
									className="font-bold text-lg"
								/>
							))}
						</tr>
						{/* Âm Dương Can */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Âm Dương Can
							</td>
							{COLS.map((col) => (
								<TruAmDuong
									key={col.key}
									tru={getTru(preData, col.key)}
									field="can"
								/>
							))}
						</tr>
						{/* Ngũ hành Can */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Ngũ hành Can
							</td>
							{COLS.map((col) => (
								<TruNguHanh
									key={col.key}
									tru={getTru(preData, col.key)}
									field="can"
								/>
							))}
						</tr>
						{/* Địa chi */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Địa chi
							</td>
							{COLS.map((col) => (
								<TruCell
									key={col.key}
									tru={getTru(preData, col.key)}
									field="chi"
									className="font-bold text-lg"
								/>
							))}
						</tr>
						{/* Âm Dương Chi */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Âm Dương Chi
							</td>
							{COLS.map((col) => (
								<TruAmDuong
									key={col.key}
									tru={getTru(preData, col.key)}
									field="chi"
								/>
							))}
						</tr>
						{/* Ngũ hành Chi */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Ngũ hành Chi
							</td>
							{COLS.map((col) => (
								<TruNguHanh
									key={col.key}
									tru={getTru(preData, col.key)}
									field="chi"
								/>
							))}
						</tr>
						{/* Thập thần */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Thập thần
							</td>
							{COLS.map((col) => (
								<TruThapThan key={col.key} tru={getTru(preData, col.key)} />
							))}
						</tr>
						{/* Nạp âm */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Nạp âm
							</td>
							{COLS.map((col) => (
								<TruCell
									key={col.key}
									tru={getTru(preData, col.key)}
									field="napAm"
								/>
							))}
						</tr>
						{/* Trường sinh */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Trường sinh
							</td>
							{COLS.map((col) => (
								<TruVongTruongSinh
									key={col.key}
									tru={getTru(preData, col.key)}
								/>
							))}
						</tr>
						{/* Thần sát */}
						<tr>
							<td className="bg-orange-100 font-semibold border-r border-yellow-200">
								Thần sát
							</td>
							{COLS.map((col) => (
								<TruThanSat key={col.key} tru={getTru(preData, col.key)} />
							))}
						</tr>
					</tbody>
				</table>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-2 xs:gap-4 text-xs xs:text-sm bg-yellow-100 text-gray-900 mt-4 xs:mt-6 rounded-lg p-2 xs:p-4 shadow border border-yellow-300 break-words">
				<div>
					<div>
						<b>Dương lịch:</b> {preData?.solarDate?.date?.slice(0, 10) ?? "--"}{" "}
						({preData?.solarDate?.dayOfWeek?.name ?? ""})
					</div>
					<div>
						<b>Âm lịch:</b> {preData?.lunarDate?.date?.slice(0, 10) ?? "--"} (
						{preData?.lunarDate?.dayOfWeek?.name ?? ""})
						{preData?.lunarDate?.isLeapMonth ? " (Nhuận)" : ""}
					</div>
					<div>
						<b>Tiết khí:</b> {preData?.solarTerm ?? "--"}
					</div>
					<div>
						<b>Lịch Phật giáo:</b> {preData?.buddhistCalendar ?? "--"}
					</div>
				</div>
				<div>
					<div>
						<b>Giờ hoàng đạo:</b> {preData?.auspiciousHour ?? "--"}
					</div>
					<div>
						<b>Can giờ 0h:</b>{" "}
						{preData?.canHour0
							? `${preData.canHour0.Can.Display} ${preData.canHour0.Chi.Display}`
							: "--"}
					</div>
				</div>
			</div>
		</section>
	);
}
