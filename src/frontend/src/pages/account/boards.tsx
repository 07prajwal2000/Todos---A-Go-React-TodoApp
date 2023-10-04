import { useEffect } from "react";
import useGlobalStore, { PageEnum } from "../../store/global";
import BoardItem from "../../components/BoardItem";

const itemsData = [
	{
		id: parseInt((Math.random() * 100000).toString()),
		total: 8,
		available: 8,
		user: 1,
		name: "todo 1",
		desc: "desc 1",
	},
	{
		id: parseInt((Math.random() * 100000).toString()),
		total: 8,
		available: 8,
		user: 1,
		name: "todo 1",
		desc: "desc 1",
	},
	{
		id: parseInt((Math.random() * 100000).toString()),
		total: 8,
		available: 8,
		user: 1,
		name: "todo 1",
		desc: "desc 1",
	},
	{
		id: parseInt((Math.random() * 100000).toString()),
		total: 8,
		available: 8,
		user: 1,
		name: "todo 1",
		desc: "desc 1",
	},
	{
		id: parseInt((Math.random() * 100000).toString()),
		total: 8,
		available: 8,
		user: 1,
		name: "todo 1",
		desc: "desc 1",
	},
	{
		id: parseInt((Math.random() * 100000).toString()),
		total: 8,
		available: 8,
		user: 1,
		name: "todo 1",
		desc: "desc 1",
	},
	{
		id: parseInt((Math.random() * 100000).toString()),
		total: 8,
		available: 8,
		user: 1,
		name: "todo 1",
		desc: "desc 1",
	},
];

const RowSpan = ({ length }: { length: number }) => {
	return (
		<>
			{length % 3 == 1 && (
				<>
					<div className="d-none board-item-no-border d-lg-block col-md-6 col-xl-0 col-xxl-4 col-0" />
					<div className="d-none board-item-no-border d-xxl-block col-md-6 col-xl-0 col-xxl-4 col-0" />
				</>
			)}
			{length % 3 == 2 && (
				<div className="board-item-no-border d-none d-xxl-block col-md-6 col-xxl-4 col-0" />
			)}
		</>
	);
};

const Boards = () => {
	const { SetCurrentPage } = useGlobalStore();
	useEffect(() => {
		SetCurrentPage(PageEnum.TodoBoard);
	}, []);
	return (
		<div className="container-fluid">
			<h1 className="pt-3">Boards</h1>
			<hr />
			<div className="row px-1 mx-auto gap-2 justify-content-center justify-content-md-around justify-content-lg-around gap-lg-4">
				{itemsData.map((x) => (
					<BoardItem
						Id={x.id}
						key={x.id}
						TotalCompleted={x.total}
						TotalAvailable={x.available}
						Remaining={x.total - x.available}
						Description={x.desc}
						Name={x.name}
						UserCount={x.user}
					/>
				))}
				<RowSpan length={itemsData.length} />
			</div>
		</div>
	);
};

export default Boards;
