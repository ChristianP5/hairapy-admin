const dateConverter = (createdAt) => {

    let date = createdAt;
    date = createdAt.replace("T", " ");
    date = createdAt.replace("Z", " ");

    return date;

}

module.exports = dateConverter;