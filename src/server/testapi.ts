// app.get('/test-api', (req: Request, res: Response) => {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

//     // Request methods you wish to allow
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//     )
//     const array: {id: number; title: string}[] = []
//     for (let i = 0; i < 200; i++) {
//       array.push({
//         id: i,
//         title: `title-${i}`,
//       })
//     }
//     const {page = 0} = req.query
//     res.send(array.slice(+page * 20, +page * 20 + 20))
//   })
