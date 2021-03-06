/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/Article": {
    get: {
      parameters: {
        query: {
          /** Название статьи содержит... */
          NameContains?: string | null;
          /** Тип задания. */
          TaskType?: components["schemas"]["TaskType"];
          /** Сотрудник, на которого наначено задание. */
          Assignee?: string | null;
          /** Автор задания. */
          Author?: string | null;
          /** Роль, на которую назначено задание. */
          Role?: components["schemas"]["RoleType"];
          /** Состояние задания. */
          State?: components["schemas"]["ArticleState"];
          /** Колонка для сортировки. */
          SortingColumn?: components["schemas"]["ArticleSortingColumn"];
          /** Быстрый поиск. */
          QuickSearch?: string | null;
          /** Количество элементов на станице. По умолчанию 20. */
          PageLimit?: number;
          /** Номер страницы. По умолчанию 1. */
          PageNumber?: number;
        };
      };
      responses: {
        /** Запрос успешный. */
        200: {
          content: {
            "application/json": components["schemas"]["ResponseArticleInfoDtoSearchResponseDto"];
          };
        };
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
    };
    put: {
      responses: {
        /** Данные статьи успешно изменены. */
        204: never;
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Недостаточно прав для изменения статьи. */
        403: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Статья не найдена. */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Конфликт новых данных стьатьи и существующих данных в БД. */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
      /** Изменная стьтья. */
      requestBody: {
        content: {
          "application/json": components["schemas"]["StoreArticleDto"];
          "text/json": components["schemas"]["StoreArticleDto"];
          "application/*+json": components["schemas"]["StoreArticleDto"];
        };
      };
    };
    post: {
      responses: {
        /** Компания успешно создана. */
        201: {
          content: {
            "application/json": components["schemas"]["ResponseArticleDto"];
          };
        };
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Недостатьчно прав для создания статьи. */
        403: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Конфликт данных создаваемой компании и существующих данных в БД. */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
      /** Информация о создаваемой статье. */
      requestBody: {
        content: {
          "application/json": components["schemas"]["StoreArticleDto"];
          "text/json": components["schemas"]["StoreArticleDto"];
          "application/*+json": components["schemas"]["StoreArticleDto"];
        };
      };
    };
  };
  "/api/Article/{id}": {
    get: operations["GetArticleAsync"];
    delete: {
      parameters: {
        path: {
          /** Индентификатор статьи. */
          id: string;
        };
      };
      responses: {
        /** Стаьтья успешно удалена. */
        204: never;
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Недостаточно прав для удаления статьи. */
        403: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Стьатья не найдена. */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
    };
  };
  "/api/Auth/login": {
    post: {
      responses: {
        /** Авторизация прошла успешно. */
        200: {
          content: {
            "application/json": components["schemas"]["LoginResponseDto"];
          };
        };
        /** Пароль или почта неверные. */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
      /** Почта и пароль. */
      requestBody: {
        content: {
          "application/json": components["schemas"]["LoginRequestDto"];
          "text/json": components["schemas"]["LoginRequestDto"];
          "application/*+json": components["schemas"]["LoginRequestDto"];
        };
      };
    };
  };
  "/api/Company": {
    get: {
      parameters: {
        query: {
          /** Название компании начинается с... */
          NameStartsWith?: string | null;
          /** Имя колонки для сортировки. */
          SortingColumn?: components["schemas"]["CompanySortingColumn"];
          /** Направление сортировки. По умолчанию сортирует по возрастанию. */
          SortDirection?: components["schemas"]["ListSortDirection"];
          /** Быстрый поиск. */
          QuickSearch?: string | null;
          /** Количество элементов на станице. По умолчанию 20. */
          PageLimit?: number;
          /** Номер страницы. По умолчанию 1. */
          PageNumber?: number;
        };
      };
      responses: {
        /** Запрос успешный. */
        200: {
          content: {
            "application/json": components["schemas"]["ResponseCompanyDtoSearchResponseDto"];
          };
        };
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
    };
    put: {
      responses: {
        /** Данные компании успешно изменены. */
        204: never;
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Компания не найдена. */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** [В планах] Конфликт новых данных компании и существующих данных в БД. */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
      /** Изменная компания. */
      requestBody: {
        content: {
          "application/json": components["schemas"]["StoreCompanyDto"];
          "text/json": components["schemas"]["StoreCompanyDto"];
          "application/*+json": components["schemas"]["StoreCompanyDto"];
        };
      };
    };
    /** При создании компании сразу создаются стандартные роли для данной компании и администратор компании. */
    post: {
      responses: {
        /** Компания успешно создана. */
        201: {
          content: {
            "application/json": components["schemas"]["ResponseCompanyDto"];
          };
        };
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Конфликт данных создаваемой компании и существующих данных в БД. */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
      /** Информация о создаваемой компании. */
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreateCompanyDto"];
          "text/json": components["schemas"]["CreateCompanyDto"];
          "application/*+json": components["schemas"]["CreateCompanyDto"];
        };
      };
    };
  };
  "/api/Company/{id}": {
    get: operations["GetCompanyAsync"];
    delete: {
      parameters: {
        path: {
          /** Индентификатор компании. */
          id: string;
        };
      };
      responses: {
        /** Компания успешно удалена. */
        204: never;
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Компания не найдена. */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
    };
  };
  "/api/Role/{id}": {
    get: operations["GetRoleAsync"];
  };
  "/api/Role": {
    get: {
      parameters: {
        query: {
          /** Название роли начинается с... */
          NameStartsWith?: string | null;
          /** Имя колонки для сортировки. */
          SortingColumn?: components["schemas"]["RoleSortingColumn"];
          /** Направление сортировки. По умолчанию сортирует по возрастанию. */
          SortDirection?: components["schemas"]["ListSortDirection"];
          /** Быстрый поиск. */
          QuickSearch?: string | null;
          /** Количество элементов на станице. По умолчанию 20. */
          PageLimit?: number;
          /** Номер страницы. По умолчанию 1. */
          PageNumber?: number;
        };
      };
      responses: {
        /** Запрос успешный. */
        200: {
          content: {
            "application/json": components["schemas"]["ResponseRoleDtoSearchResponseDto"];
          };
        };
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
    };
    put: {
      responses: {
        /** Данные роли успешно изменены. */
        204: never;
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Роль не найдена. */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** [В планах] Конфликт новых данных роли и существующих данных в БД. */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
      /** Изменная компания. */
      requestBody: {
        content: {
          "application/json": components["schemas"]["StoreRoleDto"];
          "text/json": components["schemas"]["StoreRoleDto"];
          "application/*+json": components["schemas"]["StoreRoleDto"];
        };
      };
    };
  };
  "/api/Task/take": {
    post: {
      parameters: {
        query: {
          /** Id Задания. */
          taskId?: string;
        };
      };
      responses: {
        /** Задание успешно взято в работу. */
        200: unknown;
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Недостатьчно прав для взятия задания в работу. */
        403: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Задание не найдено. */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Задание уже взято в работу. */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
    };
  };
  "/api/Task/finish": {
    post: {
      responses: {
        /** Задание успешно завершено. */
        200: unknown;
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Недостаточно прав для заверешния задания. */
        403: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Задание не найдено. */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Задание уже завершено. */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
      /** Id Задания. */
      requestBody: {
        content: {
          "application/json": components["schemas"]["FinishTaskDto"];
          "text/json": components["schemas"]["FinishTaskDto"];
          "application/*+json": components["schemas"]["FinishTaskDto"];
        };
      };
    };
  };
  "/api/Task/create": {
    post: {
      responses: {
        /** Success */
        200: unknown;
        /** Задание успешно создано. */
        201: unknown;
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Недостаточно прав для создания задания. */
        403: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Not Found */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** НЕвозможно создать задание данного типа. */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
      /** Id Задания. */
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreateTaskDto"];
          "text/json": components["schemas"]["CreateTaskDto"];
          "application/*+json": components["schemas"]["CreateTaskDto"];
        };
      };
    };
  };
  "/api/User": {
    get: {
      parameters: {
        query: {
          /** Email пользователя наинается с... */
          EmailStartsWith?: string | null;
          /** Имя пользователя начинается с... */
          FirstNameStartsWith?: string | null;
          /** Фамилия пользователя начинается с... */
          LastNameStartsWith?: string | null;
          /** Пользователь входит в роль. */
          Role?: components["schemas"]["RoleType"];
          /** Имя колонки для сортировки. */
          SortingColumn?: components["schemas"]["UserSortingColumn"];
          /** Направление сортировки.  По умолчанию сортирует по возрастанию. */
          SortDirection?: components["schemas"]["ListSortDirection"];
          /** Быстрый поиск. */
          QuickSearch?: string | null;
          /** Количество элементов на станице. По умолчанию 20. */
          PageLimit?: number;
          /** Номер страницы. По умолчанию 1. */
          PageNumber?: number;
        };
      };
      responses: {
        /** Запрос успешный. */
        200: {
          content: {
            "application/json": components["schemas"]["ResponseUserDtoSearchResponseDto"];
          };
        };
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
    };
    put: {
      responses: {
        /** Данные пользователя успешно изменены. */
        204: never;
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Недостаточно прав. */
        403: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Пользователь не найден. */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** [В планах] Конфликт новых данных пользователя и существующих данных в БД. */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["StoreUserDto"];
          "text/json": components["schemas"]["StoreUserDto"];
          "application/*+json": components["schemas"]["StoreUserDto"];
        };
      };
    };
    post: {
      responses: {
        /** Пользователь успешно создан. */
        201: {
          content: {
            "application/json": components["schemas"]["ResponseUserDto"];
          };
        };
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Конфликт данных создаваемого пользователя и существующих данных в БД. */
        409: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreateUserDto"];
          "text/json": components["schemas"]["CreateUserDto"];
          "application/*+json": components["schemas"]["CreateUserDto"];
        };
      };
    };
  };
  "/api/User/{id}": {
    get: operations["GetUserAsync"];
    delete: {
      parameters: {
        path: {
          /** Индентификатор пользователя. */
          id: string;
        };
      };
      responses: {
        /** Пользователь успешно удален. */
        204: never;
        /** Unauthorized */
        401: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Пользователь не найден. */
        404: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
        /** Пользователь не может удалить сам себя. */
        405: {
          content: {
            "application/json": components["schemas"]["ProblemDetails"];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    /** Контракт данных для создания статьи. */
    StoreArticleDto: {
      /** ID статьи. */
      id: string;
      /** Заголовок статьи. */
      title: string;
      /** Контент статьи. */
      content?: string | null;
    };
    ProblemDetails: {
      type?: string | null;
      title?: string | null;
      status?: number | null;
      detail?: string | null;
      instance?: string | null;
    } & { [key: string]: { [key: string]: any } };
    /** Типы ролей пользователя. */
    RoleType:
      | "SuperAdmin"
      | "CompanyAdmin"
      | "ChiefRedactor"
      | "Redactor"
      | "Author"
      | "Corrector";
    /** Контракт данных для получения информации о пользователе. */
    ResponseUserDto: {
      /** Уникальный идентификатор. */
      id: string;
      /** Идентификатор компании пользователя. */
      companyId: string;
      /** Email адрес. */
      email: string;
      /** Имя. */
      firstName: string;
      /** Фамилия. */
      lastName?: string | null;
      /** Список ролей, в которые входит пользователь. */
      roles: components["schemas"]["RoleType"][];
    };
    ArticleState: "Project";
    TaskType:
      | "Write"
      | "Redact"
      | "ValidateRedact"
      | "Correct"
      | "ValidateCorrect"
      | "Approve";
    ResponseTaskDto: {
      /** ID задания. */
      id: string;
      type: components["schemas"]["TaskType"];
      performer?: components["schemas"]["ResponseUserDto"];
      author?: components["schemas"]["ResponseUserDto"];
      /** Дата создания задания. */
      creationDate?: string;
      /** Дата взятия задания в работу. */
      assignmentDate?: string | null;
      /** Дата заврешения задания. */
      сompletionDate?: string | null;
      /** Комментарии к заданию. */
      description: string;
      /** Комментарии к заданию. */
      comment: string;
    };
    /** Контракт данных для полученяи полной информации о статье. */
    ResponseArticleDto: {
      /** ID статьи. */
      id: string;
      initiator?: components["schemas"]["ResponseUserDto"];
      /** Дата взятия статьи в работу. */
      creationDate?: string;
      state?: components["schemas"]["ArticleState"];
      /** Заголовок статьи. */
      title: string;
      /** Контент статьи. */
      content?: string | null;
      /** Активное задание. */
      tasks?: components["schemas"]["ResponseTaskDto"][] | null;
    };
    ArticleSortingColumn:
      | "DeadLine"
      | "Title"
      | "CreationDate"
      | "State"
      | "TaskType";
    ResponseArticleInfoDto: {
      /** ID статьи. */
      id: string;
      initiator?: components["schemas"]["ResponseUserDto"];
      /** Дата взятия статьи в работу. */
      creationDate?: string;
      state?: components["schemas"]["ArticleState"];
      /** Заголовок статьи. */
      title: string;
      task?: components["schemas"]["ResponseTaskDto"];
    };
    /** Контракт данных для результата поиска. */
    ResponseArticleInfoDtoSearchResponseDto: {
      /** Колчество элементов, удовлитвоярющих фильтрации. */
      count: number;
      /**
       * Элементы удовлитворяющие фильтрации.
       * Количество элементов ограничено максимальным количеством элементов на странице.
       */
      items: components["schemas"]["ResponseArticleInfoDto"][];
    };
    /** Контракт данных для авторизации пользователя. */
    LoginRequestDto: {
      /** Email пользователя. */
      email: string;
      /** Пароль пользвателя. */
      password: string;
    };
    /** Контракт данных для ответа сервера при успешной авторизации пользователя. */
    LoginResponseDto: {
      user: components["schemas"]["ResponseUserDto"];
      /** JWT токен. */
      securityToken: string;
    };
    /** Контракт данных для получения информации о компании. */
    StoreCompanyDto: {
      /** Уникальный идентификатор. */
      id: string;
      /** Название. */
      name: string;
    };
    /** Контракт данных дял создания адмиситратора компании. */
    CreateAdminDto: {
      /** Уникальный идентификатор. */
      id: string;
      /** Email адрес. */
      email: string;
      /** Имя. */
      firstName: string;
      /** Фамилия. */
      lastName?: string | null;
      /** Пароль. */
      password: string;
    };
    /**
     * Контракт данных для создания компании.
     * Содержит данные создаваемой компании
     * и данные администратора создаваемой компании.
     */
    CreateCompanyDto: {
      company: components["schemas"]["StoreCompanyDto"];
      admin: components["schemas"]["CreateAdminDto"];
    };
    /** Контракт данных для получения информации о компании. */
    ResponseCompanyDto: {
      /** Уникальный идентификатор. */
      id: string;
      /** Название. */
      name: string;
    };
    /** Колонки для сортировки компаний. */
    CompanySortingColumn: "Name";
    ListSortDirection: "Ascending" | "Descending";
    /** Контракт данных для результата поиска. */
    ResponseCompanyDtoSearchResponseDto: {
      /** Колчество элементов, удовлитвоярющих фильтрации. */
      count: number;
      /**
       * Элементы удовлитворяющие фильтрации.
       * Количество элементов ограничено максимальным количеством элементов на странице.
       */
      items: components["schemas"]["ResponseCompanyDto"][];
    };
    /** Контракт данных для получения информации о роли. */
    ResponseRoleDto: {
      /** Уникальный идентификатор. */
      id: string;
      type: components["schemas"]["RoleType"];
      /** Название. */
      name: string;
    };
    /** Колонки для сортировки ролей. */
    RoleSortingColumn: "Type" | "Name";
    /** Контракт данных для результата поиска. */
    ResponseRoleDtoSearchResponseDto: {
      /** Колчество элементов, удовлитвоярющих фильтрации. */
      count: number;
      /**
       * Элементы удовлитворяющие фильтрации.
       * Количество элементов ограничено максимальным количеством элементов на странице.
       */
      items: components["schemas"]["ResponseRoleDto"][];
    };
    /** Контракт данных для сохранения инфрмации о роли. */
    StoreRoleDto: {
      /** Уникальный идентификатор. */
      id: string;
      /** Название. */
      name: string;
    };
    /** Контаркт данных для завершения задания. */
    FinishTaskDto: {
      /** Идентификатор задания. */
      id?: string;
      /** Комментарии. */
      comment?: string | null;
    };
    /** Контракт для сохранения нового задания. */
    CreateTaskDto: {
      /** ID задания. */
      id: string;
      /** Id статьи, для которой создается задание. */
      articleId: string;
      taskType: components["schemas"]["TaskType"];
      /** Описание задания. */
      description: string;
      /**
       * Сотрудник, на которого назначено задания.
       * Необязательное поле.
       */
      assignee?: string | null;
    };
    /** Контракт данных дял создания пользователя. */
    CreateUserDto: {
      /** Уникальный идентификатор. */
      id: string;
      /** Email адрес. */
      email: string;
      /** Имя. */
      firstName: string;
      /** Фамилия. */
      lastName?: string | null;
      /** Пароль. */
      password: string;
      /** Список ролей, в которые входит пользователь. */
      roles?: components["schemas"]["RoleType"][] | null;
    };
    /** Колонки для сортировки пользователей. */
    UserSortingColumn: "FirstName" | "LastName" | "Email";
    /** Контракт данных для результата поиска. */
    ResponseUserDtoSearchResponseDto: {
      /** Колчество элементов, удовлитвоярющих фильтрации. */
      count: number;
      /**
       * Элементы удовлитворяющие фильтрации.
       * Количество элементов ограничено максимальным количеством элементов на странице.
       */
      items: components["schemas"]["ResponseUserDto"][];
    };
    /** Контракт данных для сохранения информации о пользователе. */
    StoreUserDto: {
      /** Уникальный идентификатор. */
      id: string;
      /** Email адрес. */
      email: string;
      /** Имя. */
      firstName: string;
      /** Фамилия. */
      lastName?: string | null;
      /** Пароль. */
      password?: string | null;
      /** Список ролей, в которые входит пользователь. */
      roles?: components["schemas"]["RoleType"][] | null;
    };
  };
}

export interface operations {
  GetArticleAsync: {
    parameters: {
      path: {
        /** Индентификатор Статьи. */
        id: string;
      };
    };
    responses: {
      /** Статья найдена. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseArticleDto"];
        };
      };
      /** Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** Статья не найдена. */
      404: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  GetCompanyAsync: {
    parameters: {
      path: {
        /** Индентификатор компании. */
        id: string;
      };
    };
    responses: {
      /** Компания найдена. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseCompanyDto"];
        };
      };
      /** Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** Компания не найдена. */
      404: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  GetRoleAsync: {
    parameters: {
      path: {
        /** Индентификатор роли. */
        id: string;
      };
    };
    responses: {
      /** Роль найдена. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseRoleDto"];
        };
      };
      /** Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** Роль не найдена. */
      404: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  GetUserAsync: {
    parameters: {
      path: {
        /** Индентификатор пользователя. */
        id: string;
      };
    };
    responses: {
      /** Пользователь найден. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseUserDto"];
        };
      };
      /** Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** Пользователь не найден. */
      404: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
}
