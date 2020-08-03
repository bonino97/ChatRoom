import { usersOnline } from './../sockets/socket';

import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/messages', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Connected'
    });

});

router.post('/messages', ( req: Request, res: Response  ) => {

    const body = req.body.body;
    const from = req.body.from;

    const payload = {
        from,
        body
    }

    const server = Server.instance;
    server.io.emit('new-message', payload); //Mensaje privado.

    res.json({
        ok: true,
        body,
        from
    });

});


router.post('/messages/:id', ( req: Request, res: Response  ) => {

    const body = req.body.body;
    const from = req.body.from;
    const id   = req.params.id;

    const payload = {
        from,
        body
    }

    const server = Server.instance;
    server.io.in(id).emit('privated-message', payload); //Mensaje privado.

    res.json({
        ok: true,
        body,
        from,
        id
    });

});

//Servicio para obtener IDs de Usuarios.

router.get('/users', (req: Request, res: Response) => {
    const server = Server.instance;

    server.io.clients( (err: any, clients: string[]) => {
        if(err) return res.json({
            ok: false,
            msg: err
        });

        res.json({
            ok: true,
            data: clients
        });

    });

});

//Obtener usuarios y sus nombres.
router.get('/users/details', (req: Request, res: Response) => {
    const server = Server.instance;

    res.json({
        ok: true,
        users: usersOnline.getUsersList() 
    })

});


export default router;


