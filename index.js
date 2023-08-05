const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require ('dotenv').config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//parser
app.use(express.urlencoded({
  extended: true
}));


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.c4kfkmr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//     // JWT API
//     app.post('/jwt', (req, res)=>{
//         const user = req.body;
//         const token = jwt.sign(user, process.env.ACCESS_JWT_TOKEN, {expiresIn:'24h'})
//         res.send({token})
//     })

// function verifyJWT(req, res, next){
//     console.log('token inside verifyJWT', req.headers.authorization);
//     const authHeader = req.headers.authorization;
//     if(!authHeader){
//         return res.status(401).send('Unauthorized Access');
//     }
//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.ACCESS_JWT_TOKEN, function(err, decoded){
//         if(err){
//             return res.status(403).send({message: 'forbidden access'})
//         }
//         req.decoded = decoded;
//         next();
//     })
// }

async function run (){
try{
    const productCollection = client.db("computer-mart").collection("products");
    // const usersCollection = client.db('ari-techs').collection('users');
    // const contactsCollection = client.db('ari-techs').collection('contacts');
    // const servicesCollection = client.db('ari-techs').collection('services');
       
    //     //Note: make sure you use verifyJWT
    //     app.get('/jwt', async(req, res)=>{
    //     const email= req.query.email;
    //     const query = ({email: email});
    //     const user = await usersCollection.findOne(query);
    //     if(user){
    //         const token = jwt.sign({email}, process.env.ACCESS_JWT_TOKEN, {expiresIn:'24h'})
    //         return res.send({accessToken: token});
    //     }
    //     console.log(user);
    //     res.status(403).send({accessToken: ''})
    // })

    // // Note: make sure you use verifyAdmin after verifyJWT
    // const verifyAdmin = async(req, res, next)=>{
    //     console.log('inside verifyAdmin', req.decoded.email)
    //     const decodedEmail = req.decoded.email;
    //     const query = {email: decodedEmail};
    //     const user = await usersCollection.findOne(query);

    //     if(user?.role !== 'admin'){
    //         return res.status(403).send({message: 'forbidden access'})
    //     }
    //     next();
    // }

    //Note: update table add column price field on appointment options

    // app.get('/addprice', async (req, res)=>{
    //     const filter = {}
    //     const options = {upsert: true}
    //     const updateDoc = {
    //         $set: {
    //             price: 500
    //         }
    //     }
    //     const result = await appointmentOptionCollection.updateMany(filter, updateDoc, options)
    //     res.send(result);
    // })

    // users crud
    // usersCollection.createIndex({ email: 1 }, { unique: true} )
    // app.post('/users', async(req, res)=>{
    //     const user = req.body;
    //     console.log(user);
    //     const result = await usersCollection.insertOne(user);
    //     res.send(result);

    // })

    app.get('/products', async (req, res)=>{
        const query = {};
        const products = await productCollection.find(query).toArray();
        res.send(products);
        // res.send({message:"success", status: 200, data:product})
    })

    app.get('/product/:id', async (req, res) => {
        const id = req.params.id;
        const result = await productCollection.findOne({_id: new ObjectId(id)});
        console.log(result);
        res.send(result);
      });

    // app.get('/users/admin/:email', async(req, res)=>{
    //     const email = req.params.email;
    //     const query = {email}
    //     const user = await usersCollection.findOne(query);
    //     res.send({isAdmin: user?.role === 'admin'});
    // })
    
    // app.put('/users/admin/:id', verifyJWT, async(req, res)=>{
    //     const id = req.params.id;
    //     const filter = {_id: new ObjectId(id)}
    //     const options = {upsert:true}
    //     const updateDoc = {
    //         $set:{
    //             role: 'admin'
    //         }
    //     }
    //     const result = await usersCollection.updateOne(filter, updateDoc, options);
    //     res.send(result);
    // })

    //    app.delete('/users/:id', verifyJWT, verifyAdmin, async(req, res)=>{
    //     const id = req.params.id;
    //     const filter = {_id: new ObjectId(id)}
    //     const result = await usersCollection.deleteOne(filter);
    //     res.send(result);

    //  })

    //  //Services
    // app.post('/services', verifyJWT, async (req, res) => {
    //     const service = req.body;
    //     const result = await servicesCollection.insertOne(service);
    //     res.send(result);
    // })

    // app.get('/services', async(req, res)=>{
    //     const query = {};
    //     const services = await servicesCollection.find(query).toArray();
    //     res.send(services);
    //  })

    //      //  for edit
    //  app.get('/services/:id', async(req, res)=>{
    //     const id = req.params.id;
    //     const query = {_id: new ObjectId(id)};
    //     const services = await servicesCollection.findOne(query);
    //     res.send(services);
    //  })

    // //  for update
    //  app.put('/services/:id', verifyJWT, async(req, res)=>{
    //      const id = req.params.id;
    //      const filter = {_id: new ObjectId(id)};
    //      const service = req.body;
    //      const option ={ upsert:true };
    //      const updatedService = {
    //         $set: {
    //             title: service.title,
    //             description: service.description,
    //             image: service.image
    //         }
    //      }
    //      const result = await servicesCollection.updateOne(filter, updatedService, option);
    //      res.send(result);
    //      console.log(service);    
    //  })

    //  app.delete('/services/:id', verifyJWT, verifyAdmin, async(req, res)=>{
    //     const id = req.params.id;
    //     const filter = {_id: new ObjectId(id)}
    //     const result = await servicesCollection.deleteOne(filter);
    //     res.send(result);
    //  })


    //  // Contacts crud
    //  app.post('/contacts', async (req, res) => {
    //      const contact = req.body;
    //      const result = await contactsCollection.insertOne(contact);
    //      res.send(result);
    //  })

    //  app.get('/contacts',verifyJWT, async(req, res)=>{
    //     const query = {};
    //     const contacts = await contactsCollection.find(query).toArray();
    //     res.send(contacts);
    //  })

    // particular email or id onujaie data pawar jonno ai api

    //  app.get('/contacts', verifyJWT, async(req, res)=>{
    //     const email = req.query.email;
    //     const decodedEmail = req.decoded.email;
    //     if(email !== decodedEmail){
    //         return res.status(403).send({message: 'forbidden access'});
    //     }
    //     const query = {email: email};
    //     console.log(query)
    //     const contacts = await contactsCollection.find(query).toArray();
    //     res.send(contacts); 
    // })

    //  for edit
    //  app.get('/contacts/:id', async(req, res)=>{
    //     const id = req.params.id;
    //     const query = {_id: new ObjectId(id)};
    //     const contacts = await contactsCollection.findOne(query);
    //     res.send(contacts);
    //  })

    // //  for update
    //  app.put('/contacts/:id', verifyJWT, async(req, res)=>{
    //      const id = req.params.id;
    //      const filter = {_id: new ObjectId(id)};
    //      const contact = req.body;
    //      const option ={ upsert:true };
    //      const updatedUser = {
    //         $set: {
    //             name: contact.name,
    //             email: contact.email,
    //             mobile: contact.mobile,
    //             message: contact.message
    //         }
    //      }
    //      const result = await contactsCollection.updateOne(filter, updatedUser, option);
    //      res.send(result);
    //      console.log(contact);    
    //  })

    //  app.delete('/contacts/:id', verifyJWT, verifyAdmin, async(req, res)=>{
    //     const id = req.params.id;
    //     const filter = {_id: new ObjectId(id)}
    //     const result = await contactsCollection.deleteOne(filter);
    //     res.send(result);

    //  })
    

}
finally{

}
}
run().catch(err => console.error(err));


app.get('/', async(req, res)=>{
    res.send('Computer mart server is running')
})

app.listen(port, ()=>console.log(`Computer mart server running on ${port}`))


// DB_USER = ariTechs
// DB_PASSWORD = KU6NeJ6RAPgj1UOd

// send grid eamil password for mail transfer
// eamil: didarhossain018@gmail.com
// password: didar!@#$hossain123