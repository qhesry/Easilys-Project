SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.messages (
    uuid text NOT NULL,
    username text NOT NULL,
    message text NOT NULL,
    "time" bigint
);

ALTER TABLE public.messages OWNER TO postgres;

CREATE TABLE public.parties (
    uuid text NOT NULL,
    name text NOT NULL,
    terminated boolean NOT NULL
);

ALTER TABLE public.parties OWNER TO postgres;

CREATE TABLE public.tchatusers (
    uuid text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tchatusers OWNER TO postgres;

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (uuid);

ALTER TABLE ONLY public.parties
    ADD CONSTRAINT "Parties_pkey" PRIMARY KEY (uuid);

ALTER TABLE ONLY public.tchatusers
    ADD CONSTRAINT "TchatUser_pkey" PRIMARY KEY (uuid);

