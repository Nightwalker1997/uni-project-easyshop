import React from 'react';
import NotFound from '../notfound';

class Pagination extends React.Component {
  constructor(props){
    super(props);
  }

  range(start, end) {
    const ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
  }

  render () {
      const totalPages = Math.ceil(this.props.totalPosts / this.props.postPerPage);
      let startPage, endPage;

      if (this.props.currentPage > totalPages || this.props.currentPage < 1) {
        return (
          <NotFound />
        );
      }

      if (totalPages <= 5) {
          // less than 5 total pages so show all
          startPage = 1;
          endPage = totalPages;
      } else {
          // more than 5 total pages so calculate start and end pages
          if (this.props.currentPage <= 3) {
              startPage = 1;
              endPage = 5;
          } else if (this.props.currentPage + 2 >= totalPages) {
              startPage = totalPages - 4;
              endPage = totalPages;
          } else {
              startPage = this.props.currentPage - 2;
              endPage = this.props.currentPage + 2;
          }
      }

      return (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">

            <li className={this.props.currentPage <= 1 ? 'page-item d-none' : 'page-item'}>
                <span className="page-link" onClick={() => this.props.changePage(1)}>
                  <span aria-hidden="true"><i className="fas fa-angle-double-left"></i></span>
                  <span className="sr-only"></span>
                </span>
            </li>

            <li className={this.props.currentPage <= 1 ? 'page-item d-none' : 'page-item'}>
              <span className="page-link" onClick={() => this.props.changePage(this.props.currentPage - 1)}>
                <span aria-hidden="true"><i className="fas fa-angle-left"></i></span>
                <span className="sr-only">Previous</span>
              </span>
            </li>

            {this.range(startPage, endPage).map(number => (
              <li key={number} className={this.props.currentPage === number ? 'page-item active' : 'page-item'}>
                <span onClick={() => this.props.changePage(number)} className="page-link">
                  {number}
                </span>
              </li>
            ))}

            <li className={this.props.currentPage >= totalPages ? 'page-item d-none' : 'page-item'}>
                <span className="page-link" onClick={() => this.props.changePage(this.props.currentPage + 1)}>
                  <span aria-hidden="true"><i className="fas fa-angle-right"></i></span>
                  <span className="sr-only">Next</span>
                </span>
            </li>

            <li className={this.props.currentPage >= totalPages ? 'page-item d-none' : 'page-item'}>
                <span className="page-link" onClick={() => this.props.changePage(totalPages)}>
                  <span aria-hidden="true"><i className="fas fa-angle-double-right"></i></span>
                  <span className="sr-only">Last</span>
                </span>
            </li>
          </ul>
        </nav>
      );
  }
}

export default Pagination;
