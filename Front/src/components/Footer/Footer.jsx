import style from "./Footer.module.css";

function Footer({videogamesPerPage, totalVideogames, paginate, currentPage}) {
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
                        {...(currentPage === number ? {className: style.pageItemActive} : {className: style.pageItem})}>
						
						<a
							onClick={() => paginate(number)}
							href="#"
							className={style.pageLink}>
							{number}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Footer;
