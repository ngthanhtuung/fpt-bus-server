module.exports = {
  //   post: {
  //     tags: ["Station"],
  //     security: [
  //       {
  //         bearerAuth: [],
  //       },
  //     ],
  //     description: "Create new trip",
  //     requestBody: {
  //       required: true,
  //       content: {
  //         "application/json": {
  //           schema: {
  //             type: "object",
  //             properties: {
  //               route_id: {
  //                 type: "string",
  //               },
  //               bus_id: {
  //                 type: "string",
  //               },
  //               departure_dates: {
  //                 type: "array",
  //               },
  //               departure_times: {
  //                 type: "array",
  //               },
  //               ticket_quantity: {
  //                 type: "number",
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //     responses: {
  //       201: {
  //         description: "Create 1 trip successfully, 1 trip already exists",
  //         content: {
  //           "application/json": {
  //             schema: {
  //               type: "object",
  //               properties: {
  //                 status: {
  //                   type: "string",
  //                   example: "Success",
  //                 },
  //                 message: {
  //                   type: "string",
  //                   example: "Create 1 trip successfully, 1 trip already exists",
  //                 },
  //                 duplicates: {
  //                   type: "array",
  //                   items: {
  //                     type: "array",
  //                     items: {
  //                       type: "object",
  //                       properties: {
  //                         date: {
  //                           type: "string",
  //                           example: "2021-02-22",
  //                         },
  //                         time: {
  //                           type: "string",
  //                           example: "07:00",
  //                         },
  //                       },
  //                     },
  //                   },
  //                 },
  //                 data: {
  //                   type: "array",
  //                   items: {
  //                     type: "array",
  //                     items: {
  //                       type: "object",
  //                       properties: {
  //                         route_id: {},
  //                       },
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       401: {
  //         description: "Unauthorized",
  //         content: {
  //           "application/json": {
  //             schema: {
  //               type: "object",
  //               properties: {
  //                 status: {
  //                   type: "string",
  //                   example: "Fail",
  //                 },
  //                 message: {
  //                   type: "string",
  //                   example: "You are not logged into the system",
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       403: {
  //         description: "Forbidden",
  //         content: {
  //           "application/json": {
  //             schema: {
  //               type: "object",
  //               properties: {
  //                 status: {
  //                   type: "string",
  //                   example: "Fail",
  //                 },
  //                 message: {
  //                   type: "string",
  //                   example: "Access denied",
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       400: {
  //         description: "Bad request",
  //         content: {
  //           "application/json": {
  //             schema: {
  //               type: "object",
  //               properties: {
  //                 status: {
  //                   type: "string",
  //                   example: "Fail",
  //                 },
  //                 message: {
  //                   type: "object",
  //                   properties: {
  //                     station_name: {
  //                       type: "string",
  //                       example: "Station name is required",
  //                     },
  //                     longitude: {
  //                       type: "string",
  //                       example: "Longitude is not valid",
  //                     },
  //                     latitude: {
  //                       type: "string",
  //                       example: "Latitude is not valid",
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       500: {
  //         description: "Internal server error",
  //         content: {
  //           "application/json": {
  //             schema: {
  //               type: "object",
  //               properties: {
  //                 status: {
  //                   type: "string",
  //                   example: "Fail",
  //                 },
  //                 message: {
  //                   type: "string",
  //                   example: "Internal server error",
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
};
