// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract DocumentRegistry is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    struct Credential {
        string documentHash;
        uint256 timestamp;
        bool revoked;
        string[] attributeKeys;
        string[] attributeValues;
        string issuerDID;
        string recipientDID;
    }

    struct CredentialDefinition {
        string definitionName;
        uint256 version;
        bool active;
    }

    struct ProofRequest {
        address requester;
        string documentHash;
        bool responded;
        bool valid;
        string proof;
    }

    struct Connection {
        address organization;
        address user;
        bool active;
    }

    mapping(address => CredentialDefinition[]) public credentialDefinitions;
    mapping(address => Credential[]) public credentials;
    mapping(address => ProofRequest[]) public proofRequests;
    mapping(address => mapping(address => Connection)) public connections; // organization => user => Connection

    event CredentialIssued(address indexed issuer, address indexed recipient, string documentHash, uint256 timestamp);
    event CredentialRevoked(address indexed recipient, string documentHash);
    event ProofRequested(address indexed requester, address indexed recipient, string documentHash);
    event ProofResponded(address indexed recipient, address indexed requester, string documentHash, bool valid, string proof);
    event ConnectionEstablished(address indexed organization, address indexed user);
    event SchemaCreated(address indexed organization, string schemaHash);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
    }

    function establishConnection(address user) public {
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");

        connections[msg.sender][user] = Connection({
            organization: msg.sender,
            user: user,
            active: true
        });

        emit ConnectionEstablished(msg.sender, user);
    }

    function createSchema(string memory schemaHash) public {
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");

        emit SchemaCreated(msg.sender, schemaHash);
    }

    function createCredentialDefinition(string memory definitionName, uint256 version) public {
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");
        CredentialDefinition memory newDefinition = CredentialDefinition({
            definitionName: definitionName,
            version: version,
            active: true
        });

        credentialDefinitions[msg.sender].push(newDefinition);
    }

    function issueCredential(
        address recipient,
        string memory documentHash,
        string[] memory keys,
        string[] memory values,
        string memory issuerDID,
        string memory recipientDID
    ) public {
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");
        require(keys.length == values.length, "Keys and values length mismatch");

        Credential memory newCredential = Credential({
            documentHash: documentHash,
            timestamp: block.timestamp,
            revoked: false,
            attributeKeys: keys,
            attributeValues: values,
            issuerDID: issuerDID,
            recipientDID: recipientDID
        });

        credentials[recipient].push(newCredential);

        emit CredentialIssued(msg.sender, recipient, documentHash, block.timestamp);
    }

    function revokeCredential(address recipient, string memory documentHash) public {
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");
        Credential[] storage userCredentials = credentials[recipient];

        for (uint256 i = 0; i < userCredentials.length; i++) {
            if (keccak256(abi.encodePacked(userCredentials[i].documentHash)) == keccak256(abi.encodePacked(documentHash))) {
                userCredentials[i].revoked = true;
                emit CredentialRevoked(recipient, documentHash);
                break;
            }
        }
    }

    function verifyCredential(address recipient, string memory documentHash) public view returns (bool) {
        Credential[] storage userCredentials = credentials[recipient];

        for (uint256 i = 0; i < userCredentials.length; i++) {
            if (
                keccak256(abi.encodePacked(userCredentials[i].documentHash)) == keccak256(abi.encodePacked(documentHash)) &&
                !userCredentials[i].revoked
            ) {
                return true;
            }
        }

        return false;
    }

    function updateCredentialDefinition(address organization, uint256 definitionIndex, uint256 newVersion) public {
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuer");
        CredentialDefinition storage definition = credentialDefinitions[organization][definitionIndex];
        definition.version = newVersion;
    }

    function getCredentialAttribute(address recipient, uint256 credentialIndex, string memory key) public view returns (string memory) {
        Credential storage credential = credentials[recipient][credentialIndex];
        for (uint256 i = 0; i < credential.attributeKeys.length; i++) {
            if (keccak256(abi.encodePacked(credential.attributeKeys[i])) == keccak256(abi.encodePacked(key))) {
                return credential.attributeValues[i];
            }
        }
        revert("Attribute not found");
    }

    function requestProof(address recipient, string memory documentHash) public {
        require(connections[msg.sender][recipient].active, "Connection not established");

        ProofRequest memory newRequest = ProofRequest({
            requester: msg.sender,
            documentHash: documentHash,
            responded: false,
            valid: false,
            proof: ""
        });

        proofRequests[recipient].push(newRequest);
        emit ProofRequested(msg.sender, recipient, documentHash);
    }

    function respondProof(uint256 requestIndex, bool isValid, string memory proof) public {
        ProofRequest storage request = proofRequests[msg.sender][requestIndex];
        require(!request.responded, "Proof request already responded");

        request.responded = true;
        request.valid = isValid;
        request.proof = proof;

        emit ProofResponded(msg.sender, request.requester, request.documentHash, isValid, proof);
    }
}
