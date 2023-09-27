import style from "./Footer.module.css";

	
function Footer({ videogamesPerPage, totalVideogames, paginate, currentPage, svpp }) {

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalVideogames / videogamesPerPage); i++) {
		pageNumbers.push(i);
	}


	return (
		<div className={style.container}>
			<ul className={style.pagination}>
				{pageNumbers.map((number) => (
					<li
						key={number}
						onClick={() => paginate(number)}
						{...(currentPage == number
							? { className: style.pageItemActive }
							: { className: style.pageItem })}>
						<a
							
							href="#"
							className={style.pageLink}>
							{number}
						</a>
					</li>
				))}

			</ul>
			<div className={style.select}>
				<label htmlFor="videogamesPerPage">Videogames per page: </label>
				<select
					name="videogamesPerPage"
					id="videogamesPerPage"
					onChange={(e) => {svpp(e.target.value);paginate(1);}}>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="20">20</option>
				</select>
			</div>
		</div>
	);
}

export default Footer;
