import Constants from "./constants";

export const REGISTRATION_STATUS = {
  SUCCESS: "success",
  INVALID_CODE: "invalidCode",
  ERROR: "error",
};

// The backend is the sole source of truth for whether a ticket code is
// valid (see src/api-php-react/database.php) -- it responds 503 for an
// unrecognized code and 201 on success.
export const submitRegistration = async (payload) => {
  try {
    const response = await fetch(`${Constants.ROUTE_API}/database.php`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (response.status === 503) {
      return { status: REGISTRATION_STATUS.INVALID_CODE };
    }
    if (response.status === 201) {
      return { status: REGISTRATION_STATUS.SUCCESS };
    }
    return { status: REGISTRATION_STATUS.ERROR };
  } catch (error) {
    return { status: REGISTRATION_STATUS.ERROR };
  }
};
