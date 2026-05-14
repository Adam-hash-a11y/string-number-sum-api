import {
  createCallLog,
  getAllCallLogs,
  getCallLogById,
  getCallLogsByStatus,
} from "../../src/service/callLogService";
import {
  saveCallLog,
  findAllCallLogs,
  findCallLogById,
  findCallLogsByStatus,
} from "../../src/repository/callLog.repository";
import { CallLog, CallStatus } from "../../src/types/callLog.types";

jest.mock("../../src/repository/callLog.repository");

describe("test callLog service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save and return the call log", async () => {
    // Given
    const data: CallLog = {
      status: "success",
      data: { ch: "123", n: 2, sanitize: false, result: 5 },
    };
    (saveCallLog as jest.Mock).mockResolvedValue(data);

    // When
    const result = await createCallLog(data);

    // Then
    expect(result).toEqual(data);
  });

  it("should return all call logs", async () => {
    // Given
    const mockLogs: CallLog[] = [
      {
        status: "success",
        data: { ch: "123", n: 2, sanitize: false, result: 5 },
      },
    ];
    (findAllCallLogs as jest.Mock).mockResolvedValue(mockLogs);

    // When
    const result = await getAllCallLogs();

    // Then
    expect(result).toEqual(mockLogs);
  });

  it("should return the call log with the given id", async () => {
    // Given
    const id = 1;
    const mockLog: CallLog = {
      status: "success",
      data: { ch: "123", n: 2, sanitize: false, result: 5 },
    };
    (findCallLogById as jest.Mock).mockResolvedValue(mockLog);

    // When
    const result = await getCallLogById(id);

    // Then
    expect(result).toEqual(mockLog);
  });

  it("should return call logs with the given status", async () => {
    // Given
    const status: CallStatus = "success";
    const mockLogs: CallLog[] = [
      { status, data: { ch: "123", n: 2, sanitize: false, result: 5 } },
    ];
    (findCallLogsByStatus as jest.Mock).mockResolvedValue(mockLogs);

    // When
    const result = await getCallLogsByStatus(status);

    // Then
    expect(result).toEqual(mockLogs);
  });
});
