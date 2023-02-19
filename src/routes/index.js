import { Router } from "express";
import moment from "moment";

const routeIndex = Router();
routeIndex.post('/debuggin', (req, res) => {
    res.json({
        id: 'randomstring',
        date: moment(),
        data: {
            key: 'keyExample',
            user: 'me',
            pass: 'me-123'
        }
    });
});

export default routeIndex;