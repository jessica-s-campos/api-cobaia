/**
 * db.query(`CREATE TABLE public.cfgemails
    (
        email text COLLATE pg_catalog."default",
        host text COLLATE pg_catalog."default",
        password text COLLATE pg_catalog."default",
        secure boolean,
        port integer
    )`)
    .then(() => {

        db.query(`INSERT INTO public.cfgemails(
            email, host, password, secure, port)
            VALUES ('falecomigo@eliascosta.com.br', 'mail.eliascosta.com.br', 'EliasMestrado2020@', true, 465);`);

        db.query(`INSERT INTO public.cfgemails(
            email, host, password, secure, port)
            VALUES ('jessicacampos.si@gmail.com', 'smtp.gmail.com', 'zxbgfsmvtdsqsgbb', true, 465);`);


        db.query(`select * from cfgemails where email = '${req.body.user}'`).then(result => {
            res.status(200).send({message : 'acho q foi ok', result : result.rows})
        })
           
    })
 * * */


