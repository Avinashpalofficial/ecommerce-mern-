class APIfeatures {
  constructor(query, queryStr) {
    ((this.query = query), (this.queryStr = queryStr));
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  Filter() {
    const queryCopy = { ...this.queryStr };
    //remove the unnecessary field
    const removefield = ["keyword", "page", "limit"];
    removefield.forEach((t) => delete queryCopy[t]);
    let queryStr = JSON.stringify(queryCopy);
    //advanced filtering for pricing ,ratings
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIfeatures;
