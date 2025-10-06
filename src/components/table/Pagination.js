import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // - currentPage: текущая страница (начинается с 1)
  // - totalPages: общее количество страниц
  // - onPageChange: функция вызываемая при смене страницы

  const pages = []; //Создаем пустой массив pages который будет содержать JSX элементы всех страниц
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      //i - номер страницы
      <BootstrapPagination.Item
        key={i} //уникальный ключ React (номер страницы)
        active={i === currentPage} //делает страницу активной если она текущая
        onClick={() => onPageChange(i)} //при клике вызывает колбек с номером страницы
      >
        {i}
      </BootstrapPagination.Item>
    );
  }
  return (
    <BootstrapPagination className="justify-content-center">
      <BootstrapPagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pages}
      <BootstrapPagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </BootstrapPagination>
  );
};

export default Pagination;
// Например: [1] [2] ... [5] [6] [7] [8] [9] ... [19] [20]
