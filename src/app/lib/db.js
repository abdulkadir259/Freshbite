const {username,password} = process.env
console.log(username, password);

export const connectionStr="mongodb+srv://abdulkadir:30370390@cluster0.k9aox.mongodb.net/foodDb?retryWrites=true&w=majority&appName=Cluster0";
// export const connectionStr=`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.k9aox.mongodb.net/foodDb?retryWrites=true&w=majority&appName=Cluster0`;