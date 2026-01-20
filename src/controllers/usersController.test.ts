import { makeMockResponse } from "../mocks/mockResponse";
import { UsersController } from "./usersController"
import { Request } from "express";

describe('Users Controller', () => {
    const usersController = new UsersController;

    const mockRequest = {} as Request;
    const mockResponse = makeMockResponse();
    it('Deve listar os usuários cadastrados', () => {
        usersController.listarUsuarios(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toHaveLength(4)
    })

    it('Deve criar um novo usuário', () => {
        mockRequest.body = {
            name:'Novo usuário'
        }

        usersController.criarUsuario(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({'mensagem' : `Usuário Novo usuário criado.`})
    })

    it('Não deve criar um usuário com o nome em branco', () => {
        mockRequest.body = {
            name: ''
        }

        usersController.criarUsuario(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(403);
        expect(mockResponse.state.json).toMatchObject({mensagem: 'Não é possível criar usuários sem um nome.'})
    })
})