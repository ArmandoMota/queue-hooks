Initial stab at a simple webhook server

Current Logic & Constants:
Max number of retries: 5

Retry algorithm: Each attempt has a delay of 2^(attemptNumber) seconds

Failure criteria: 2xx status response not returned within 5 seconds
