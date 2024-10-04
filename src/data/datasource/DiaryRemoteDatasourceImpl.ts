import axios, { AxiosInstance } from 'axios';
import { DiaryModel } from '../models/Diary';
import { DiaryRemoteDataSource } from './DiaryRemoteDatasource';
import { BaseResponseModel } from '../models/BaseResponse';
import { BASE_URL } from '../../core/constants/ApiUrl';
import ServerException from '../../core/errors/exceptions';
import { SemanticQueryWithChatHistory } from '../models/SemanticQueryWithChatHistory';

export class DiaryRemoteDataSourceImpl implements DiaryRemoteDataSource {
    private client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.client = client;
    }

    async getPIAResponse(queryWithChatHistory: SemanticQueryWithChatHistory): Promise<any> {
        try {
            console.log('queryWithChatHistory', queryWithChatHistory.toJson());
            const response = await this.client.post(
                `${BASE_URL}/diary/rag-response`,
                queryWithChatHistory.toJson(),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const baseResponse: BaseResponseModel<string> = BaseResponseModel.fromJson(
                response.data,
                (data: any) => data as string
            );

            if (baseResponse.code !== 200) {
                console.log('baseResponse', baseResponse);
                throw new ServerException(baseResponse.msg, baseResponse.code);
            }

            console.log('baseResponse', baseResponse.data);
            return baseResponse.data;
        } catch (error) {
            console.log('error', error);
            if (axios.isAxiosError(error)) {
                throw new ServerException(error.message, error.response?.status || 500);
            } else {
                throw new ServerException('Server error', 500);
            }
        }
    }

    async createEntry(entry: DiaryModel): Promise<void> {
        try {
            const response = await this.client.post(
                `${BASE_URL}/diary`,
                entry.toJson(),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const baseResponse: BaseResponseModel<string> = BaseResponseModel.fromJson(
                response.data,
                (data: any) => data as string
            );

            if (baseResponse.code !== 201) {
                throw new ServerException(baseResponse.msg, baseResponse.code);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new ServerException(error.message, error.response?.status || 500);
            } else {
                throw new ServerException('Server error', 500);
            }
        }
    }
}