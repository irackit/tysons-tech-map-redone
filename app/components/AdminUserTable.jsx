import React, { Component } from 'react';

class AdminUserTable extends React.Component {
    constructor() {
        super();

        this.SORT_ORDER = { UNSORTED: 0, ASC: 1, DESC: 2 };
        this.SORT_METHOD =  {
            BY_EMAIL: 0,
            BY_ADDRESS_STREET_NO: 1,
            BY_ADDRESS_STREET_NAME: 2,
            BY_ADDRESS_CITY: 3,
            BY_ADDRESS_STATE: 4,
            BY_ADDRESS_ZIP: 5,
            BY_IS_ADMIN: 6
        };

        this.NUM_ROWS_PER_PAGE = 10;

        this.state = { sortOrder: this.SORT_ORDER.UNSORTED, pageNum: 1 };   // TODO: Isn't there a default initialState or something for this
                                                                            // and shouldn't sortMethod be in it

        this.sort = this.sort.bind(this)
        this.getHeaderRowString = this.getHeaderRowString.bind(this);
        this.calcNumPages = this.calcNumPages.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentWillMount() {
        this.getUsers();
    }

    getUsers() {
        const URL = 'http://localhost:3000/users';

        // TODO: Should probably handle error case
        // TODO: Handle case where no users
        let successFunc = (response) => {
            this.state.users = response.users;      //TODO: PROBABLY WRONG
            this.sort(this.SORT_METHOD.BY_EMAIL);
        };

        $.ajax({
            url: URL,
            dataType: 'json',
            success: successFunc
        });
    }

    sort(sortMethod) {
        let newSortOrder = this.SORT_ORDER.ASC;

        if ( this.state.sortMethod === sortMethod ) {
            newSortOrder = this.state.sortOrder === this.SORT_ORDER.ASC ? this.SORT_ORDER.DESC : this.SORT_ORDER.ASC;
        }

        let sortedUsers = this.state.users.sort( (a,b) => {
            let result;

            let nameA;
            let nameB;

            switch (sortMethod) {
                case this.SORT_METHOD.BY_EMAIL:
                    nameA = a.email.toUpperCase();
                    nameB = b.email.toUpperCase();
                break;

                case this.SORT_METHOD.BY_ADDRESS_STREET_NO:
                    nameA = a.address.streetNo.toUpperCase();
                    nameB = b.address.streetNo.toUpperCase();
                break;

                case this.SORT_METHOD.BY_ADDRESS_STREET_NAME:
                    nameA = a.address.streetName.toUpperCase();
                    nameB = b.adress.streetName.toUpperCase();
                break;

                case this.SORT_METHOD.BY_ADDRESS_CITY:
                    nameA = a.address.city.toUpperCase();
                    nameB = b.address.city.toUpperCase();
                break;

                case this.SORT_METHOD.BY_ADDRESS_STATE:
                    nameA = a.address.state.toUpperCase();
                    nameB = b.address.state.toUpperCase();
                break;

                case this.SORT_METHOD.BY_ADDRESS_ZIP:
                    nameA = a.address.zip.toUpperCase();
                    nameB = b.address.zip.toUpperCase();
                break;

                case this.SORT_METHOD.BY_IS_ADMIN:
                    nameA = a.isAdmin;
                    nameB = b.isAdmin;
                break;

                default:
                break;
            }

            if (nameA < nameB) {
                result = -1;
            }
            else if (nameA > nameB) {
                result = 1;
            }
            else {
                result = 0;
            }

            if ( newSortOrder === this.SORT_ORDER.DESC ) {
                result *= -1;
            }

            return result;
        });

        this.setState({ users: sortedUsers, sortMethod: sortMethod, sortOrder: newSortOrder });
    }

    getHeaderRowString(sortMethod) {
        let headerRowStr = "";

        switch (sortMethod) {
            case this.SORT_METHOD.BY_EMAIL:
                headerRowStr += "Email";
            break;

            case this.SORT_METHOD.BY_ADDRESS_STREET_NO:
                headerRowStr += "Street No";
            break;

            case this.SORT_METHOD.BY_ADDRESS_STREET_NAME:
                headerRowStr += "Street Name";
            break;

            case this.SORT_METHOD.BY_ADDRESS_CITY:
                headerRowStr += "City";
            break;

            case this.SORT_METHOD.BY_ADDRESS_STATE:
                headerRowStr += "State";
            break;


            case this.SORT_METHOD.BY_ADDRESS_ZIP:
                headerRowStr += "Zip";
            break;

            case this.SORT_METHOD.BY_IS_ADMIN:
                headerRowStr += "Admin";
            break;

            default:
            break;
        }

        if ( sortMethod === this.state.sortMethod ) {
            if ( this.state.sortOrder === this.SORT_ORDER.ASC ) {
                headerRowStr += " ▼";
            }
            else {
                headerRowStr += " ▲";
            }
        }

        return headerRowStr;
    }

    calcNumPages() {
        if ( this.state.users !== undefined ) {
            return Math.trunc(this.state.users.length / this.NUM_ROWS_PER_PAGE) + 1;
        }
        return 0;
    }

    prevPage() {
        if ( this.state.pageNum !== 1 ) {
            this.setState({
                pageNum: this.state.pageNum - 1
            });
        }
    }

    nextPage() {
        if ( this.state.pageNum !== this.calcNumPages() ) {
            this.setState( {
                pageNum: this.state.pageNum + 1
            });
        }
    }

    render() {
        if (this.state.users == undefined) {
            return <span>Loading...</span>;
        }

        let headerRow = (
            <div className="header-row">
                <div className="cell" onClick={() => this.sort(this.SORT_METHOD.BY_EMAIL)}>{this.getHeaderRowString(this.SORT_METHOD.BY_EMAIL)}</div>
                <div className="cell" onClick={() => this.sort(this.SORT_METHOD.BY_ADDRESS_STREET_NO)}>{this.getHeaderRowString(this.SORT_METHOD.BY_ADDRESS_STREET_NO)}</div>
                <div className="cell" onClick={() => this.sort(this.SORT_METHOD.BY_ADDRESS_STREET_NAME)}>{this.getHeaderRowString(this.SORT_METHOD.BY_ADDRESS_STREET_NAME)}</div>
                <div className="cell" onClick={() => this.sort(this.SORT_METHOD.BY_ADDRESS_CITY)}>{this.getHeaderRowString(this.SORT_METHOD.BY_ADDRESS_CITY)}</div>
                <div className="cell" onClick={() => this.sort(this.SORT_METHOD.BY_ADDRESS_STATE)}>{this.getHeaderRowString(this.SORT_METHOD.BY_ADDRESS_STATE)}</div>
                <div className="cell" onClick={() => this.sort(this.SORT_METHOD.BY_ADDRESS_ZIP)}>{this.getHeaderRowString(this.SORT_METHOD.BY_ADDRESS_ZIP)}</div>
                <div className="cell" onClick={() => this.sort(this.SORT_METHOD.BY_IS_ADMIN)}>{this.getHeaderRowString(this.SORT_METHOD.BY_IS_ADMIN)}</div>
            </div>
        );

        let startPos = (this.state.pageNum - 1) * this.NUM_ROWS_PER_PAGE;
        let endPos = startPos + this.NUM_ROWS_PER_PAGE - 1;

        if ( this.state.users.length - 1 < endPos ) {
            endPos = this.state.users.length - 1;
        }

        let rows = [];

        // TODO: Handle if a value is undefined

        for (let i = startPos; i <= endPos; i++) {
            console.log(this.state.users[i])
            let row = (
                <div className="row">
                    <div className="cell">{this.state.users[i].email}</div>
                    <div className="cell">{this.state.users[i].address.streetNo}</div>
                    <div className="cell">{this.state.users[i].address.streetName}</div>
                    <div className="cell">{this.state.users[i].address.city}</div>
                    <div className="cell">{this.state.users[i].address.state}</div>
                    <div className="cell">{this.state.users[i].address.zip}</div>
                    <div className="cell">{this.state.users[i].isAdmin}</div>
                </div>
            );

            rows.push(row);
        }

        let paginationControls = (
            <div className="pagination-ctrls">
                <div className="pagination-btn-container">
                    <button className={`pagination-btn pagination-prev-btn ${this.state.pageNum !== 1 ? "clickable-btn" : "non-clickable-btn"}`} onClick={this.prevPage}></button>
                </div>
                <div className="page-info-container-container">
                    <div className="page-info-container">Page <span className="page-num">{this.state.pageNum}</span> of <span className="page-num">{this.calcNumPages()}</span></div>
                </div>
                <div className="pagination-btn-container">
                    <button id="test" className={`pagination-btn pagination-next-btn ${this.state.pageNum !== this.calcNumPages() ? "clickable-btn" : "non-clickable-btn"}`} onClick={this.nextPage}></button>
                </div>
            </div>
        );

        return (
            <div className="table-container">
                {headerRow}
                {rows}
                {paginationControls}
            </div>
        );
    }
}

//export default AdminUserTable;

module.exports = AdminUserTable;