const express = require('express');
const { criarBaseOmie, listarBasesOmie, atualizarBaseOmie, deletarBaseOmie } = require('../controllers/baseOmieController');

const router = express.Router();

router.post('/', criarBaseOmie);
router.get('/', listarBasesOmie);
router.put('/:id', atualizarBaseOmie);
router.delete('/:id', deletarBaseOmie);

module.exports = router;
